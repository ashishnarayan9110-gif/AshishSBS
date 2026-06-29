"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const insightSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),
  title: z.string().min(1),
  guestName: z.string().optional().or(z.literal("")),
  videoUrl: z.string().optional().or(z.literal("")),
  summary: z.string().min(1),
  body: z.string().optional().or(z.literal("")),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseForm(formData: FormData) {
  return insightSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    guestName: formData.get("guestName") ?? "",
    videoUrl: formData.get("videoUrl") ?? "",
    summary: formData.get("summary"),
    body: formData.get("body") ?? "",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createInsight(formData: FormData) {
  const user = await requireStaff();
  const data = parseForm(formData);

  await prisma.insight.create({
    data: {
      ...data,
      guestName: data.guestName || null,
      videoUrl: data.videoUrl || null,
      body: data.body || null,
      authorId: user.id,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  redirect("/admin/insights");
}

export async function updateInsight(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.insight.findUnique({ where: { id } });

  await prisma.insight.update({
    where: { id },
    data: {
      ...data,
      guestName: data.guestName || null,
      videoUrl: data.videoUrl || null,
      body: data.body || null,
      publishedAt:
        data.contentStatus === "PUBLISHED"
          ? (existing?.publishedAt ?? new Date())
          : (existing?.publishedAt ?? null),
    },
  });

  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  revalidatePath(`/insights/${data.slug}`);
  redirect("/admin/insights");
}

export async function deleteInsight(id: string) {
  await requireStaff();
  await prisma.insight.delete({ where: { id } });
  revalidatePath("/admin/insights");
  revalidatePath("/insights");
}
