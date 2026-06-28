"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const resourceSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  title: z.string().min(1),
  category: z.string().optional().or(z.literal("")),
  format: z.string().optional().or(z.literal("")),
  difficulty: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  downloadUrl: z.string().optional().or(z.literal("")),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseForm(formData: FormData) {
  return resourceSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    category: formData.get("category") ?? "",
    format: formData.get("format") ?? "",
    difficulty: formData.get("difficulty") ?? "",
    description: formData.get("description") ?? "",
    downloadUrl: formData.get("downloadUrl") ?? "",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createResource(formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);

  await prisma.resource.create({
    data: {
      ...data,
      category: data.category || null,
      format: data.format || null,
      difficulty: data.difficulty || null,
      description: data.description || null,
      downloadUrl: data.downloadUrl || null,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  redirect("/admin/resources");
}

export async function updateResource(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.resource.findUnique({ where: { id } });

  await prisma.resource.update({
    where: { id },
    data: {
      ...data,
      category: data.category || null,
      format: data.format || null,
      difficulty: data.difficulty || null,
      description: data.description || null,
      downloadUrl: data.downloadUrl || null,
      publishedAt:
        data.contentStatus === "PUBLISHED" ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null,
    },
  });

  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  revalidatePath(`/resources/${data.slug}`);
  redirect("/admin/resources");
}

export async function deleteResource(id: string) {
  await requireStaff();
  await prisma.resource.delete({ where: { id } });
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
}
