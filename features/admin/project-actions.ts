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
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),
  title: z.string().min(1),
  summary: z.string().min(1),
  background: z.string().optional().or(z.literal("")),
  process: z.string().optional().or(z.literal("")),
  outcome: z.string().optional().or(z.literal("")),
  ventureId: z.string().optional().or(z.literal("")),
  discipline: z.enum([
    "DIGITAL",
    "FURNITURE",
    "TEACHING",
    "BUSINESS",
    "PERSONAL",
    "OTHER",
  ]),
  outcomeStatus: z
    .enum(["SHIPPED", "RUNNING", "PAUSED", "FAILED"])
    .optional()
    .or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
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
    discipline: formData.get("discipline") ?? "DIGITAL",
    outcomeStatus: formData.get("outcomeStatus") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    featured: formData.get("featured") === "on",
    contentStatus: formData.get("contentStatus"),
  });
}

function scalarFields(data: ReturnType<typeof parseForm>) {
  return {
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    background: data.background || null,
    process: data.process || null,
    outcome: data.outcome || null,
    ventureId: data.ventureId || null,
    discipline: data.discipline,
    outcomeStatus: data.outcomeStatus || null,
    imageUrl: data.imageUrl || null,
    featured: data.featured ?? false,
    contentStatus: data.contentStatus,
  };
}

export async function createProject(formData: FormData) {
  const user = await requireStaff();
  const data = parseForm(formData);
  const crewIds = formData.getAll("crewIds").map(String).filter(Boolean);

  await prisma.project.create({
    data: {
      ...scalarFields(data),
      authorId: user.id,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
      crew: { create: crewIds.map((personId) => ({ personId })) },
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/crew");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const crewIds = formData.getAll("crewIds").map(String).filter(Boolean);
  const existing = await prisma.project.findUnique({ where: { id } });

  await prisma.project.update({
    where: { id },
    data: {
      ...scalarFields(data),
      publishedAt:
        data.contentStatus === "PUBLISHED"
          ? (existing?.publishedAt ?? new Date())
          : (existing?.publishedAt ?? null),
      // Replace the credit list wholesale — the form submits the full set.
      crew: {
        deleteMany: {},
        create: crewIds.map((personId) => ({ personId })),
      },
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/crew");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireStaff();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/crew");
}
