import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("[resend] RESEND_API_KEY is not set — email sending will fail.");
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
export const OWNER_EMAIL = "ashishnarayan9110@gmail.com";
