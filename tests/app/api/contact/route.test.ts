import { describe, expect, it, vi, beforeEach } from "vitest";

const mockCreate = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: { contactSubmission: { create: (...args: unknown[]) => mockCreate(...args) } },
}));

const { POST } = await import("@/app/api/contact/route");

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  reason: "CONSULTING",
  message: "I would like to discuss a potential consulting engagement.",
};

function makeRequest(body: unknown, ip = "1.2.3.4") {
  return new Request("https://ashish.sbs/api/contact", {
    method: "POST",
    headers: { "x-forwarded-for": ip, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  mockCreate.mockReset();
  mockCreate.mockResolvedValue({});
});

describe("POST /api/contact", () => {
  it("accepts a valid submission and writes to the database", async () => {
    const response = await POST(makeRequest(validBody, "10.0.0.1"));
    expect(response.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledOnce();
  });

  it("rejects an invalid submission with 400 and does not write to the database", async () => {
    const response = await POST(makeRequest({ ...validBody, email: "nope" }, "10.0.0.2"));
    expect(response.status).toBe(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot-triggered submissions without writing to the database", async () => {
    const response = await POST(makeRequest({ ...validBody, fax: "bot" }, "10.0.0.3"));
    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.error).toBeDefined();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("rate-limits after 5 submissions from the same IP within the window", async () => {
    const ip = "10.0.0.4";
    for (let i = 0; i < 5; i++) {
      const response = await POST(makeRequest(validBody, ip));
      expect(response.status).toBe(200);
    }

    const sixth = await POST(makeRequest(validBody, ip));
    expect(sixth.status).toBe(429);
  });

  it("does not rate-limit a different IP", async () => {
    const response = await POST(makeRequest(validBody, "10.0.0.5"));
    expect(response.status).toBe(200);
  });
});
