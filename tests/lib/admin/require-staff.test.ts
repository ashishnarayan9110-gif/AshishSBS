import { describe, expect, it, vi, beforeEach } from "vitest";

const mockAuth = vi.fn();

vi.mock("@/auth", () => ({
  auth: () => mockAuth(),
}));

const { requireStaff } = await import("@/lib/admin/require-staff");

beforeEach(() => {
  mockAuth.mockReset();
});

describe("requireStaff", () => {
  it("allows FOUNDER", async () => {
    mockAuth.mockResolvedValue({ user: { id: "1", role: "FOUNDER" } });
    const user = await requireStaff();
    expect(user.role).toBe("FOUNDER");
  });

  it("allows ADMINISTRATOR", async () => {
    mockAuth.mockResolvedValue({ user: { id: "2", role: "ADMINISTRATOR" } });
    await expect(requireStaff()).resolves.toBeTruthy();
  });

  it("allows EDITOR", async () => {
    mockAuth.mockResolvedValue({ user: { id: "3", role: "EDITOR" } });
    await expect(requireStaff()).resolves.toBeTruthy();
  });

  it("rejects VIEWER", async () => {
    mockAuth.mockResolvedValue({ user: { id: "4", role: "VIEWER" } });
    await expect(requireStaff()).rejects.toThrow("Not authorized.");
  });

  it("rejects GUEST", async () => {
    mockAuth.mockResolvedValue({ user: { id: "5", role: "GUEST" } });
    await expect(requireStaff()).rejects.toThrow("Not authorized.");
  });

  it("rejects CONTRIBUTOR", async () => {
    mockAuth.mockResolvedValue({ user: { id: "6", role: "CONTRIBUTOR" } });
    await expect(requireStaff()).rejects.toThrow("Not authorized.");
  });

  it("rejects an unauthenticated session", async () => {
    mockAuth.mockResolvedValue(null);
    await expect(requireStaff()).rejects.toThrow("Not authorized.");
  });
});
