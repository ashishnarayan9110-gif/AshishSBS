"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  title: z.string().min(1),
  summary: z.string().min(1),
  background: z.string().optional().or(z.literal("")),
  process: z.string().optional().or(z.literal("")),
  outcome: z.string().optional().or(z.literal("")),
  ventureId: z.string().optional().or(z.literal("")),
  featured: z.coerce.boolean().optional(),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseForm(formData: FormData) {
  return projectSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    background: formData.get("background") ?? "",
    process: formData.get("process") ?? "",
    outcome: formData.get("outcome") ?? "",
    ventureId: formData.get("ventureId") ?? "",
    featured: formData.get("featured") === "on",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createProject(formData: FormData) {
  const user = await requireStaff();
  const data = parseForm(formData);

  await prisma.project.create({
    data: {
      ...data,
      background: data.background || null,
      process: data.process || null,
      outcome: data.outcome || null,
      ventureId: data.ventureId || null,
      authorId: user.id,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.project.findUnique({ where: { id } });

  await prisma.project.update({
    where: { id },
    data: {
      ...data,
      background: data.background || null,
      process: data.process || null,
      outcome: data.outcome || null,
      ventureId: data.ventureId || null,
      publishedAt:
        data.contentStatus === "PUBLISHED" ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireStaff();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
