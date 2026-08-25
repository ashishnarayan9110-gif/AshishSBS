"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const certificationSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),
  title: z.string().min(1),
  issuer: z.string().min(1),
  issuedAt: z.string().optional().or(z.literal("")),
  expiresAt: z.string().optional().or(z.literal("")),
  credentialId: z.string().optional().or(z.literal("")),
  // Only a real http(s) link is worth storing — a broken "verify" link is
  // worse than none, since the whole point of the field is checkability.
  verifyUrl: z
    .string()
    .regex(/^https?:\/\/\S+$/, "Must be a full http(s) URL.")
    .optional()
    .or(z.literal("")),
  skills: z.string().optional().or(z.literal("")),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function parseDate(value: string | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseForm(formData: FormData) {
  const data = certificationSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    issuedAt: formData.get("issuedAt") ?? "",
    expiresAt: formData.get("expiresAt") ?? "",
    credentialId: formData.get("credentialId") ?? "",
    verifyUrl: formData.get("verifyUrl") ?? "",
    skills: formData.get("skills") ?? "",
    contentStatus: formData.get("contentStatus"),
  });

  return {
    slug: data.slug,
    title: data.title,
    issuer: data.issuer,
    issuedAt: parseDate(data.issuedAt),
    expiresAt: parseDate(data.expiresAt),
    credentialId: data.credentialId || null,
    verifyUrl: data.verifyUrl || null,
    skills: data.skills || null,
    contentStatus: data.contentStatus,
  };
}

export async function createCertification(formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);

  await prisma.certification.create({
    data: {
      ...data,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/certifications");
  revalidatePath("/about");
  redirect("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  const existing = await prisma.certification.findUnique({ where: { id } });

  await prisma.certification.update({
    where: { id },
    data: {
      ...data,
      publishedAt:
        data.contentStatus === "PUBLISHED"
          ? (existing?.publishedAt ?? new Date())
          : (existing?.publishedAt ?? null),
    },
  });

  revalidatePath("/admin/certifications");
  revalidatePath("/about");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await requireStaff();
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/admin/certifications");
  revalidatePath("/about");
}
