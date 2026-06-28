"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const serviceSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  name: z.string().min(1),
  problem: z.string().optional().or(z.literal("")),
  idealClient: z.string().optional().or(z.literal("")),
  approach: z.string().optional().or(z.literal("")),
  deliverables: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseForm(formData: FormData) {
  return serviceSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    problem: formData.get("problem") ?? "",
    idealClient: formData.get("idealClient") ?? "",
    approach: formData.get("approach") ?? "",
    deliverables: formData.get("deliverables") ?? "",
    timeline: formData.get("timeline") ?? "",
    contentStatus: formData.get("contentStatus"),
  });
}

export async function createService(formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);

  await prisma.service.create({
    data: {
      ...data,
      problem: data.problem || null,
      idealClient: data.idealClient || null,
      approach: data.approach || null,
      deliverables: data.deliverables || null,
      timeline: data.timeline || null,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.service.findUnique({ where: { id } });

  await prisma.service.update({
    where: { id },
    data: {
      ...data,
      problem: data.problem || null,
      idealClient: data.idealClient || null,
      approach: data.approach || null,
      deliverables: data.deliverables || null,
      timeline: data.timeline || null,
      publishedAt:
        data.contentStatus === "PUBLISHED" ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${data.slug}`);
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireStaff();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}
