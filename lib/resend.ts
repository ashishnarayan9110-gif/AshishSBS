import { Resend } from "resend";

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
export const OWNER_EMAIL = "ashishnarayan9110@gmail.com";

let client: Resend | null = null;

/**
 * Lazily construct the Resend client. Resend v6 throws if instantiated with an
 * empty key, so we must never build it at module load — doing so breaks the
 * production build wherever RESEND_API_KEY is absent (e.g. Vercel before the
 * env var is set). Constructing on first use keeps the build green and defers
 * any failure to an actual send.
 */
export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[resend] RESEND_API_KEY is not set — email sending will fail.");
  }
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY ?? "");
  }
  return client;
}
