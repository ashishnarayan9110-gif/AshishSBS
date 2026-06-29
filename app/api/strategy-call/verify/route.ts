import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const verifySchema = z.object({
  bookingId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = verifySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid verification payload." }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json(
      { error: "Payment verification unavailable." },
      { status: 503 },
    );
  }

  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    parsed.data;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(razorpay_signature);
  const isValid =
    expectedBuffer.length === providedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, providedBuffer);

  if (!isValid) {
    await prisma.strategyCallBooking.updateMany({
      where: { id: bookingId, razorpayOrderId: razorpay_order_id },
      data: { paymentStatus: "FAILED" },
    });
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  await prisma.strategyCallBooking.updateMany({
    where: { id: bookingId, razorpayOrderId: razorpay_order_id },
    data: { paymentStatus: "PAID", razorpayPaymentId: razorpay_payment_id },
  });

  return NextResponse.json({ ok: true });
}
