import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getResend, FROM_EMAIL, OWNER_EMAIL } from "@/lib/resend";
import { realtyInquirySchema } from "@/lib/schemas/realty-inquiry";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = realtyInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { listingSlug, fax: _fax, ...data } = parsed.data;

  // Honeypot — silently succeed if bot filled it in
  if (_fax) {
    return NextResponse.json({ ok: true });
  }

  // Find the listing for the relation
  let listingId: string | undefined;
  if (listingSlug) {
    const listing = await prisma.realtyListing
      .findUnique({ where: { slug: listingSlug } })
      .catch(() => null);
    listingId = listing?.id;
  }

  await prisma.realtyInquiry.create({
    data: { ...data, listingId },
  });

  // Send email notification to owner
  const purposeLabel =
    data.purpose === "INVESTMENT"
      ? "Investment"
      : data.purpose === "OWN_USE"
        ? "Own Use"
        : data.purpose === "LEASING"
          ? "Leasing"
          : "Not specified";

  await getResend().emails
    .send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Realty Inquiry — HSIIDC SCO Barwala`,
      html: `
        <h2 style="font-family:sans-serif;margin:0 0 24px;">New Realty Inquiry</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:540px;">
          <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;font-weight:500;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">${data.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;">${data.email}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;">${data.company ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">City</td><td style="padding:8px 0;">${data.city ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Budget</td><td style="padding:8px 0;">${data.budget ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Purpose</td><td style="padding:8px 0;">${purposeLabel}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Message</td><td style="padding:8px 0;">${data.message ?? "—"}</td></tr>
        </table>
        <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
        <p style="font-family:sans-serif;font-size:13px;color:#6b7280;margin:0;">
          Property: HSIIDC SCO, Phase-1, Barwala (Alipur), Panchkula<br/>
          Source: realty.ashish.sbs<br/>
          Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </p>
      `,
    })
    .catch((err) => console.error("[resend] email failed:", err));

  return NextResponse.json({ ok: true });
}
