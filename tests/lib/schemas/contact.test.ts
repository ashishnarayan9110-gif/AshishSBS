import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/schemas/contact";

const validBase = {
  name: "Jane Doe",
  email: "jane@example.com",
  reason: "CONSULTING" as const,
  message: "I would like to discuss a potential consulting engagement.",
};

describe("contactFormSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("rejects a missing name", () => {
    const result = contactFormSchema.safeParse({ ...validBase, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({ ...validBase, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown reason", () => {
    const result = contactFormSchema.safeParse({ ...validBase, reason: "SPAM" });
    expect(result.success).toBe(false);
  });

  it("rejects a message under 10 characters", () => {
    const result = contactFormSchema.safeParse({ ...validBase, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects when the honeypot field is filled in", () => {
    const result = contactFormSchema.safeParse({
      ...validBase,
      fax: "bot filled this in",
    });
    expect(result.success).toBe(false);
  });

  it("accepts an empty honeypot field", () => {
    const result = contactFormSchema.safeParse({ ...validBase, fax: "" });
    expect(result.success).toBe(true);
  });

  it("treats optional fields as optional", () => {
    const result = contactFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });
});
