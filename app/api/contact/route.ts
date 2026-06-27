import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas/contact";
import { prisma } from "@/lib/prisma";

// Simple in-memory rate limit: 5 submissions per IP per hour.
// Sufficient for a low-traffic personal site; replace with Redis if the
// platform moves to multiple server instances.
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
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.fax) {
    // Honeypot triggered — silently accept to avoid tipping off bots.
    return NextResponse.json({ ok: true });
  }

  await prisma.contactSubmission.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      reason: parsed.data.reason,
      message: parsed.data.message,
      company: parsed.data.company || null,
      website: parsed.data.website || null,
      phone: parsed.data.phone || null,
    },
  });

  return NextResponse.json({ ok: true });
}
