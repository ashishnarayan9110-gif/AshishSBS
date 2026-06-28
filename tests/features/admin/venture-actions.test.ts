import { describe, expect, it, vi, beforeEach } from "vitest";

const mockRequireStaff = vi.fn();
const mockPrisma = {
  venture: {
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

const { createVenture, updateVenture, deleteVenture } =
  await import("@/features/admin/venture-actions");

function formDataFrom(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
}

const validVentureFields = {
  slug: "test-venture",
  name: "Test Venture",
  status: "ACTIVE",
  summary: "A venture used for testing.",
  contentStatus: "DRAFT",
};

beforeEach(() => {
  mockRequireStaff.mockReset();
  mockPrisma.venture.create.mockReset();
  mockPrisma.venture.update.mockReset();
  mockPrisma.venture.delete.mockReset();
  mockPrisma.venture.findUnique.mockReset();
});

describe("venture admin actions — authorization", () => {
  it("createVenture never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(createVenture(formDataFrom(validVentureFields))).rejects.toThrow(
      "Not authorized.",
    );
    expect(mockPrisma.venture.create).not.toHaveBeenCalled();
  });

  it("updateVenture never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(
      updateVenture("venture-1", formDataFrom(validVentureFields)),
    ).rejects.toThrow("Not authorized.");
    expect(mockPrisma.venture.update).not.toHaveBeenCalled();
  });

  it("deleteVenture never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(deleteVenture("venture-1")).rejects.toThrow("Not authorized.");
    expect(mockPrisma.venture.delete).not.toHaveBeenCalled();
  });

  it("createVenture calls prisma.create with parsed data once authorized", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.venture.create.mockResolvedValue({});

    await expect(createVenture(formDataFrom(validVentureFields))).rejects.toThrow(
      "NEXT_REDIRECT",
    );

    expect(mockPrisma.venture.create).toHaveBeenCalledOnce();
    const call = mockPrisma.venture.create.mock.calls[0][0];
    expect(call.data.slug).toBe("test-venture");
    expect(call.data.authorId).toBe("user-1");
  });

  it("createVenture rejects an invalid slug before reaching prisma", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });

    await expect(
      createVenture(formDataFrom({ ...validVentureFields, slug: "Not A Valid Slug!" })),
    ).rejects.toThrow();
    expect(mockPrisma.venture.create).not.toHaveBeenCalled();
  });
});
