import { NextResponse } from "next/server";
import { strategyCallSchema } from "@/lib/schemas/strategy-call";
import { prisma } from "@/lib/prisma";
import { getRazorpayClient, STRATEGY_CALL_AMOUNT_PAISE } from "@/lib/razorpay";

const submissions = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = strategyCallSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.fax) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  let razorpayOrder;
  try {
    const razorpay = getRazorpayClient();
    razorpayOrder = await razorpay.orders.create({
      amount: STRATEGY_CALL_AMOUNT_PAISE,
      currency: "INR",
      notes: { name: parsed.data.name, email: parsed.data.email },
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Payment is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  const booking = await prisma.strategyCallBooking.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      question: parsed.data.question,
      triedSoFar: parsed.data.triedSoFar,
      stage: parsed.data.stage,
      amount: STRATEGY_CALL_AMOUNT_PAISE,
      razorpayOrderId: razorpayOrder.id,
    },
  });

  return NextResponse.json({
    bookingId: booking.id,
    orderId: razorpayOrder.id,
    amount: STRATEGY_CALL_AMOUNT_PAISE,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
}
