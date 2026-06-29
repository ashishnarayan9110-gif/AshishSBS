import { NextResponse } from "next/server";
import { ideaSubmissionSchema } from "@/lib/schemas/idea-submission";
import { prisma } from "@/lib/prisma";

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
  const parsed = ideaSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.fax) {
    return NextResponse.json({ ok: true });
  }

  await prisma.ideaSubmission.create({
    data: {
      name: parsed.data.name,
      businessIdea: parsed.data.businessIdea,
      targetCustomer: parsed.data.targetCustomer,
      problem: parsed.data.problem,
      biggestChallenge: parsed.data.biggestChallenge,
    },
  });

  return NextResponse.json({ ok: true });
}
