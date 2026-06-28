"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const STAFF_ROLES = new Set(["FOUNDER", "ADMINISTRATOR", "EDITOR"]);

async function requireStaff() {
  const session = await auth();
  if (!session?.user || !STAFF_ROLES.has(session.user.role)) {
    throw new Error("Not authorized.");
  }
  return session.user;
}

const ventureSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  name: z.string().min(1),
  status: z.enum(["RESEARCH", "ACTIVE", "PAUSED", "SUNSET"]),
  industry: z.string().optional().or(z.literal("")),
  summary: z.string().min(1),
  problem: z.string().optional().or(z.literal("")),
  solution: z.string().optional().or(z.literal("")),
  currentStage: z.string().optional().or(z.literal("")),
  featured: z.coerce.boolean().optional(),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseVentureForm(formData: FormData) {
  return ventureSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    status: formData.get("status"),
    industry: formData.get("industry") ?? "",
    summary: formData.get("summary"),
    problem: formData.get("problem") ?? "",
    solution: formData.get("solution") ?? "",
    currentStage: formData.get("currentStage") ?? "",
    featured: formData.get("featured") === "on",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createVenture(formData: FormData) {
  const user = await requireStaff();
  const data = parseVentureForm(formData);

  await prisma.venture.create({
    data: {
      ...data,
      industry: data.industry || null,
      problem: data.problem || null,
      solution: data.solution || null,
      currentStage: data.currentStage || null,
      authorId: user.id,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/ventures");
  revalidatePath("/ventures");
  redirect("/admin/ventures");
}

export async function updateVenture(id: string, formData: FormData) {
  await requireStaff();
  const data = parseVentureForm(formData);

  const existing = await prisma.venture.findUnique({ where: { id } });

  await prisma.venture.update({
    where: { id },
    data: {
      ...data,
      industry: data.industry || null,
      problem: data.problem || null,
      solution: data.solution || null,
      currentStage: data.currentStage || null,
      publishedAt:
        data.contentStatus === "PUBLISHED" ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null,
    },
  });

  revalidatePath("/admin/ventures");
  revalidatePath("/ventures");
  revalidatePath(`/ventures/${data.slug}`);
  redirect("/admin/ventures");
}

export async function deleteVenture(id: string) {
  await requireStaff();
  await prisma.venture.delete({ where: { id } });
  revalidatePath("/admin/ventures");
  revalidatePath("/ventures");
}
