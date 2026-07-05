import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getResend, FROM_EMAIL, OWNER_EMAIL } from "@/lib/resend";
import { smallBizWaitlistSchema } from "@/lib/schemas/smallbiz-waitlist";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = smallBizWaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 422 });
  }

  if (parsed.data.fax) {
    return NextResponse.json({ ok: true });
  }

  try {
    await prisma.smallBizWaitlist.create({ data: { email: parsed.data.email } });
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === "P2002") {
      // Already on the list — still return ok
      return NextResponse.json({ ok: true });
    }
    console.error("[smallbiz waitlist]", err);
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }

  await getResend().emails
    .send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: "New SmallBiz Waitlist Signup",
      html: `<p style="font-family:sans-serif;">New waitlist signup on smallbusinessforsale.ashish.sbs:</p><p style="font-family:sans-serif;font-size:18px;font-weight:600;">${parsed.data.email}</p>`,
    })
    .catch((e) => console.error("[resend]", e));

  return NextResponse.json({ ok: true });
}
