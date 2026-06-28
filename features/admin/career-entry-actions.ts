"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const careerEntrySchema = z.object({
  project: z.string().min(1),
  organisation: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional().or(z.literal("")),
  overview: z.string().min(1),
  publicOutcome: z.string().optional().or(z.literal("")),
  lessons: z.string().optional().or(z.literal("")),
});

function parseForm(formData: FormData) {
  return careerEntrySchema.parse({
    project: formData.get("project"),
    organisation: formData.get("organisation"),
    role: formData.get("role"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") ?? "",
    overview: formData.get("overview"),
    publicOutcome: formData.get("publicOutcome") ?? "",
    lessons: formData.get("lessons") ?? "",
  });
}

export async function createCareerEntry(formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);

  await prisma.careerEntry.create({
    data: {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      publicOutcome: data.publicOutcome || null,
      lessons: data.lessons || null,
    },
  });

  revalidatePath("/admin/career");
  revalidatePath("/career");
  redirect("/admin/career");
}

export async function updateCareerEntry(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);

  await prisma.careerEntry.update({
    where: { id },
    data: {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      publicOutcome: data.publicOutcome || null,
      lessons: data.lessons || null,
    },
  });

  revalidatePath("/admin/career");
  revalidatePath("/career");
  redirect("/admin/career");
}

export async function deleteCareerEntry(id: string) {
  await requireStaff();
  await prisma.careerEntry.delete({ where: { id } });
  revalidatePath("/admin/career");
  revalidatePath("/career");
}
