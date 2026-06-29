import Razorpay from "razorpay";

// Lazily constructed so the app can build/run without real Razorpay keys
// until the account is approved — only throws when a payment is actually
// attempted, not at import time.
let client: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  if (client) return client;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay is not configured yet — set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
    );
  }

  client = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return client;
}

export const STRATEGY_CALL_AMOUNT_PAISE = 149900; // ₹1,499
