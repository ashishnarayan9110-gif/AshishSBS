import { describe, expect, it, vi, beforeEach } from "vitest";

const mockRequireStaff = vi.fn();
const mockPrisma = {
  project: {
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

const { createProject, updateProject } = await import(
  "@/features/admin/project-actions"
);

function formDataFrom(
  fields: Record<string, string>,
  repeated: Record<string, string[]> = {},
) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  for (const [key, values] of Object.entries(repeated)) {
    for (const value of values) formData.append(key, value);
  }
  return formData;
}

const validProjectFields = {
  slug: "oak-desk",
  title: "Oak Desk",
  summary: "A desk built from a single slab.",
  discipline: "FURNITURE",
  contentStatus: "DRAFT",
};

beforeEach(() => {
  mockRequireStaff.mockReset();
  mockPrisma.project.create.mockReset();
  mockPrisma.project.update.mockReset();
  mockPrisma.project.findUnique.mockReset();
});

describe("project admin actions — discipline and outcome", () => {
  it("stores a non-digital discipline", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.project.create.mockResolvedValue({});

    await expect(createProject(formDataFrom(validProjectFields))).rejects.toThrow(
      "NEXT_REDIRECT",
    );

    const call = mockPrisma.project.create.mock.calls[0][0];
    expect(call.data.discipline).toBe("FURNITURE");
  });

  it("records FAILED as a real outcome rather than dropping it", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.project.create.mockResolvedValue({});

    await expect(
      createProject(
        formDataFrom({ ...validProjectFields, outcomeStatus: "FAILED" }),
      ),
    ).rejects.toThrow("NEXT_REDIRECT");

    const call = mockPrisma.project.create.mock.calls[0][0];
    expect(call.data.outcomeStatus).toBe("FAILED");
  });

  it("an unrecorded outcome is stored as null, not an empty string", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.project.create.mockResolvedValue({});

    await expect(
      createProject(formDataFrom({ ...validProjectFields, outcomeStatus: "" })),
    ).rejects.toThrow("NEXT_REDIRECT");

    const call = mockPrisma.project.create.mock.calls[0][0];
    expect(call.data.outcomeStatus).toBeNull();
  });

  it("rejects a discipline outside the enum before reaching prisma", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });

    await expect(
      createProject(
        formDataFrom({ ...validProjectFields, discipline: "POTTERY" }),
      ),
    ).rejects.toThrow();
    expect(mockPrisma.project.create).not.toHaveBeenCalled();
  });

  it("defaults to DIGITAL when the form omits a discipline", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.project.create.mockResolvedValue({});

    const fields = { ...validProjectFields } as Record<string, string>;
    delete fields.discipline;

    await expect(createProject(formDataFrom(fields))).rejects.toThrow(
      "NEXT_REDIRECT",
    );

    const call = mockPrisma.project.create.mock.calls[0][0];
    expect(call.data.discipline).toBe("DIGITAL");
  });
});

describe("project admin actions — crew credits", () => {
  it("creates a credit row for each selected person", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.project.create.mockResolvedValue({});

    await expect(
      createProject(
        formDataFrom(validProjectFields, { crewIds: ["p1", "p2"] }),
      ),
    ).rejects.toThrow("NEXT_REDIRECT");

    const call = mockPrisma.project.create.mock.calls[0][0];
    expect(call.data.crew.create).toEqual([{ personId: "p1" }, { personId: "p2" }]);
  });

  it("replaces the whole credit list on update so removals stick", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.project.findUnique.mockResolvedValue({ publishedAt: null });
    mockPrisma.project.update.mockResolvedValue({});

    await expect(
      updateProject(
        "project-1",
        formDataFrom(validProjectFields, { crewIds: ["p2"] }),
      ),
    ).rejects.toThrow("NEXT_REDIRECT");

    const call = mockPrisma.project.update.mock.calls[0][0];
    expect(call.data.crew.deleteMany).toEqual({});
    expect(call.data.crew.create).toEqual([{ personId: "p2" }]);
  });
});
