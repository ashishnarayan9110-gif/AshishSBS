"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const principleSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),
  title: z.string().min(1),
  statement: z.string().min(1),
  explanation: z.string().optional().or(z.literal("")),
  examples: z.string().optional().or(z.literal("")),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseForm(formData: FormData) {
  return principleSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    statement: formData.get("statement"),
    explanation: formData.get("explanation") ?? "",
    examples: formData.get("examples") ?? "",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createPrinciple(formData: FormData) {
  const user = await requireStaff();
  const data = parseForm(formData);

  await prisma.principle.create({
    data: {
      ...data,
      explanation: data.explanation || null,
      examples: data.examples || null,
      authorId: user.id,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/principles");
  revalidatePath("/principles");
  redirect("/admin/principles");
}

export async function updatePrinciple(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.principle.findUnique({ where: { id } });

  await prisma.principle.update({
    where: { id },
    data: {
      ...data,
      explanation: data.explanation || null,
      examples: data.examples || null,
      publishedAt:
        data.contentStatus === "PUBLISHED"
          ? (existing?.publishedAt ?? new Date())
          : (existing?.publishedAt ?? null),
    },
  });

  revalidatePath("/admin/principles");
  revalidatePath("/principles");
  revalidatePath(`/principles/${data.slug}`);
  redirect("/admin/principles");
}

export async function deletePrinciple(id: string) {
  await requireStaff();
  await prisma.principle.delete({ where: { id } });
  revalidatePath("/admin/principles");
  revalidatePath("/principles");
}
