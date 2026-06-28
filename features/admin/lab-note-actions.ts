"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const labNoteSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),
  title: z.string().min(1),
  category: z.string().optional().or(z.literal("")),
  body: z.string().min(1),
  pinned: z.coerce.boolean().optional(),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseForm(formData: FormData) {
  return labNoteSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    category: formData.get("category") ?? "",
    body: formData.get("body"),
    pinned: formData.get("pinned") === "on",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createLabNote(formData: FormData) {
  const user = await requireStaff();
  const data = parseForm(formData);

  await prisma.labNote.create({
    data: {
      ...data,
      category: data.category || null,
      authorId: user.id,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/lab");
  revalidatePath("/lab");
  redirect("/admin/lab");
}

export async function updateLabNote(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.labNote.findUnique({ where: { id } });

  await prisma.labNote.update({
    where: { id },
    data: {
      ...data,
      category: data.category || null,
      publishedAt:
        data.contentStatus === "PUBLISHED"
          ? (existing?.publishedAt ?? new Date())
          : (existing?.publishedAt ?? null),
    },
  });

  revalidatePath("/admin/lab");
  revalidatePath("/lab");
  revalidatePath(`/lab/${data.slug}`);
  redirect("/admin/lab");
}

export async function deleteLabNote(id: string) {
  await requireStaff();
  await prisma.labNote.delete({ where: { id } });
  revalidatePath("/admin/lab");
  revalidatePath("/lab");
}
