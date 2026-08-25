import { describe, expect, it, vi, beforeEach } from "vitest";

const mockRequireStaff = vi.fn();
const mockPrisma = {
  certification: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findUnique: vi.fn(),
  },
};

vi.mock("@/lib/admin/require-staff", () => ({
  requireStaff: () => mockRequireStaff(),
}));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

const { createCertification, updateCertification, deleteCertification } =
  await import("@/features/admin/certification-actions");

function formDataFrom(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  return formData;
}

const validFields = {
  slug: "hubspot-content-marketing",
  title: "Content Marketing Certified",
  issuer: "HubSpot Academy",
  contentStatus: "DRAFT",
};

beforeEach(() => {
  mockRequireStaff.mockReset();
  mockPrisma.certification.create.mockReset();
  mockPrisma.certification.update.mockReset();
  mockPrisma.certification.delete.mockReset();
  mockPrisma.certification.findUnique.mockReset();
});

describe("certification admin actions — authorization", () => {
  it("createCertification never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(createCertification(formDataFrom(validFields))).rejects.toThrow(
      "Not authorized.",
    );
    expect(mockPrisma.certification.create).not.toHaveBeenCalled();
  });

  it("updateCertification never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(
      updateCertification("cert-1", formDataFrom(validFields)),
    ).rejects.toThrow("Not authorized.");
    expect(mockPrisma.certification.update).not.toHaveBeenCalled();
  });

  it("deleteCertification never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(deleteCertification("cert-1")).rejects.toThrow("Not authorized.");
    expect(mockPrisma.certification.delete).not.toHaveBeenCalled();
  });
});

describe("certification admin actions — validation", () => {
  it("rejects a verify URL that is not http(s), so a dead link never publishes", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });

    await expect(
      createCertification(
        formDataFrom({ ...validFields, verifyUrl: "javascript:alert(1)" }),
      ),
    ).rejects.toThrow();
    expect(mockPrisma.certification.create).not.toHaveBeenCalled();
  });

  it("accepts a blank verify URL and stores it as null", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.certification.create.mockResolvedValue({});

    await expect(
      createCertification(formDataFrom({ ...validFields, verifyUrl: "" })),
    ).rejects.toThrow("NEXT_REDIRECT");

    expect(mockPrisma.certification.create.mock.calls[0][0].data.verifyUrl).toBeNull();
  });

  it("parses dates into Date objects", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.certification.create.mockResolvedValue({});

    await expect(
      createCertification(
        formDataFrom({ ...validFields, issuedAt: "2026-07-12", expiresAt: "2028-08-10" }),
      ),
    ).rejects.toThrow("NEXT_REDIRECT");

    const call = mockPrisma.certification.create.mock.calls[0][0];
    expect(call.data.issuedAt).toBeInstanceOf(Date);
    expect(call.data.issuedAt.toISOString().slice(0, 10)).toBe("2026-07-12");
    expect(call.data.expiresAt.toISOString().slice(0, 10)).toBe("2028-08-10");
  });

  it("stores an unparseable date as null rather than Invalid Date", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.certification.create.mockResolvedValue({});

    await expect(
      createCertification(formDataFrom({ ...validFields, issuedAt: "not-a-date" })),
    ).rejects.toThrow("NEXT_REDIRECT");

    expect(mockPrisma.certification.create.mock.calls[0][0].data.issuedAt).toBeNull();
  });

  it("a new certification defaults to draft with no publishedAt", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.certification.create.mockResolvedValue({});

    await expect(createCertification(formDataFrom(validFields))).rejects.toThrow(
      "NEXT_REDIRECT",
    );

    const call = mockPrisma.certification.create.mock.calls[0][0];
    expect(call.data.contentStatus).toBe("DRAFT");
    expect(call.data.publishedAt).toBeNull();
  });
});
