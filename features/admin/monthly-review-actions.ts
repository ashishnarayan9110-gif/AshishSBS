"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const monthlyReviewSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  month: z.string().min(1),
  whatIBuilt: z.string().optional().or(z.literal("")),
  whatILearned: z.string().optional().or(z.literal("")),
  problems: z.string().optional().or(z.literal("")),
  failures: z.string().optional().or(z.literal("")),
  reading: z.string().optional().or(z.literal("")),
  nextMonth: z.string().optional().or(z.literal("")),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseForm(formData: FormData) {
  return monthlyReviewSchema.parse({
    slug: formData.get("slug"),
    month: formData.get("month"),
    whatIBuilt: formData.get("whatIBuilt") ?? "",
    whatILearned: formData.get("whatILearned") ?? "",
    problems: formData.get("problems") ?? "",
    failures: formData.get("failures") ?? "",
    reading: formData.get("reading") ?? "",
    nextMonth: formData.get("nextMonth") ?? "",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createMonthlyReview(formData: FormData) {
  const user = await requireStaff();
  const data = parseForm(formData);

  await prisma.monthlyReview.create({
    data: {
      ...data,
      month: new Date(`${data.month}-01`),
      whatIBuilt: data.whatIBuilt || null,
      whatILearned: data.whatILearned || null,
      problems: data.problems || null,
      failures: data.failures || null,
      reading: data.reading || null,
      nextMonth: data.nextMonth || null,
      authorId: user.id,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/monthly");
  revalidatePath("/monthly");
  redirect("/admin/monthly");
}

export async function updateMonthlyReview(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.monthlyReview.findUnique({ where: { id } });

  await prisma.monthlyReview.update({
    where: { id },
    data: {
      ...data,
      month: new Date(`${data.month}-01`),
      whatIBuilt: data.whatIBuilt || null,
      whatILearned: data.whatILearned || null,
      problems: data.problems || null,
      failures: data.failures || null,
      reading: data.reading || null,
      nextMonth: data.nextMonth || null,
      publishedAt:
        data.contentStatus === "PUBLISHED" ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null,
    },
  });

  revalidatePath("/admin/monthly");
  revalidatePath("/monthly");
  revalidatePath(`/monthly/${data.slug}`);
  redirect("/admin/monthly");
}

export async function deleteMonthlyReview(id: string) {
  await requireStaff();
  await prisma.monthlyReview.delete({ where: { id } });
  revalidatePath("/admin/monthly");
  revalidatePath("/monthly");
}
