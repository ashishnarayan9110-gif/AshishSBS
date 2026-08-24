import { describe, expect, it, vi, beforeEach } from "vitest";

const mockRequireStaff = vi.fn();
const mockPrisma = {
  person: {
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

const { createPerson, updatePerson, deletePerson, parseLinks } = await import(
  "@/features/admin/person-actions"
);

function formDataFrom(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
}

const validPersonFields = {
  slug: "ramesh-carpenter",
  name: "Ramesh",
  contentStatus: "DRAFT",
};

beforeEach(() => {
  mockRequireStaff.mockReset();
  mockPrisma.person.create.mockReset();
  mockPrisma.person.update.mockReset();
  mockPrisma.person.delete.mockReset();
  mockPrisma.person.findUnique.mockReset();
});

describe("person admin actions — authorization", () => {
  it("createPerson never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(createPerson(formDataFrom(validPersonFields))).rejects.toThrow(
      "Not authorized.",
    );
    expect(mockPrisma.person.create).not.toHaveBeenCalled();
  });

  it("updatePerson never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(
      updatePerson("person-1", formDataFrom(validPersonFields)),
    ).rejects.toThrow("Not authorized.");
    expect(mockPrisma.person.update).not.toHaveBeenCalled();
  });

  it("deletePerson never calls prisma when the caller is not staff", async () => {
    mockRequireStaff.mockRejectedValue(new Error("Not authorized."));

    await expect(deletePerson("person-1")).rejects.toThrow("Not authorized.");
    expect(mockPrisma.person.delete).not.toHaveBeenCalled();
  });

  it("createPerson rejects an invalid slug before reaching prisma", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });

    await expect(
      createPerson(formDataFrom({ ...validPersonFields, slug: "Not A Slug!" })),
    ).rejects.toThrow();
    expect(mockPrisma.person.create).not.toHaveBeenCalled();
  });
});

describe("person admin actions — publishing", () => {
  it("a new person defaults to draft and gets no publishedAt", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.person.create.mockResolvedValue({});

    await expect(createPerson(formDataFrom(validPersonFields))).rejects.toThrow(
      "NEXT_REDIRECT",
    );

    const call = mockPrisma.person.create.mock.calls[0][0];
    expect(call.data.contentStatus).toBe("DRAFT");
    expect(call.data.publishedAt).toBeNull();
  });

  it("publishing a person stamps publishedAt", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.person.create.mockResolvedValue({});

    await expect(
      createPerson(
        formDataFrom({ ...validPersonFields, contentStatus: "PUBLISHED" }),
      ),
    ).rejects.toThrow("NEXT_REDIRECT");

    const call = mockPrisma.person.create.mock.calls[0][0];
    expect(call.data.publishedAt).toBeInstanceOf(Date);
  });

  it("blank optional fields are stored as null, not empty strings", async () => {
    mockRequireStaff.mockResolvedValue({ id: "user-1", role: "FOUNDER" });
    mockPrisma.person.create.mockResolvedValue({});

    await expect(
      createPerson(formDataFrom({ ...validPersonFields, alias: "", quirk: "" })),
    ).rejects.toThrow("NEXT_REDIRECT");

    const call = mockPrisma.person.create.mock.calls[0][0];
    expect(call.data.alias).toBeNull();
    expect(call.data.quirk).toBeNull();
  });
});

describe("parseLinks", () => {
  it("parses one 'Label | url' pair per line", async () => {
    expect(await parseLinks("Site | https://example.com")).toEqual([
      { label: "Site", url: "https://example.com" },
    ]);
  });

  it("keeps urls that themselves contain a pipe", async () => {
    expect(await parseLinks("Q | https://example.com/?a=1|2")).toEqual([
      { label: "Q", url: "https://example.com/?a=1|2" },
    ]);
  });

  it("drops lines with no url, a bare label, or a non-http scheme", async () => {
    expect(
      await parseLinks("Just a name\n| https://example.com\nEvil | javascript:alert(1)"),
    ).toEqual([]);
  });

  it("ignores blank lines and trims surrounding whitespace", async () => {
    expect(await parseLinks("\n  Site  |  https://example.com  \n\n")).toEqual([
      { label: "Site", url: "https://example.com" },
    ]);
  });
});
