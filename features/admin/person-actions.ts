"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

const personSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),
  name: z.string().min(1),
  alias: z.string().optional().or(z.literal("")),
  role: z.string().optional().or(z.literal("")),
  quirk: z.string().optional().or(z.literal("")),
  howWeMet: z.string().optional().or(z.literal("")),
  whatTheyDid: z.string().optional().or(z.literal("")),
  photoUrl: z.string().optional().or(z.literal("")),
  links: z.string().optional().or(z.literal("")),
  featured: z.coerce.boolean().optional(),
  contentStatus: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

// Links are entered one per line as "Label | https://example.com". Anything
// without a usable http(s) URL is dropped rather than stored half-formed.
export async function parseLinks(raw: string) {
  const entries = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      const url = rest.join("|").trim();
      return { label: label.trim(), url };
    })
    .filter((entry) => entry.label && /^https?:\/\/\S+$/.test(entry.url));

  return entries;
}

async function parseForm(formData: FormData) {
  const data = personSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    alias: formData.get("alias") ?? "",
    role: formData.get("role") ?? "",
    quirk: formData.get("quirk") ?? "",
    howWeMet: formData.get("howWeMet") ?? "",
    whatTheyDid: formData.get("whatTheyDid") ?? "",
    photoUrl: formData.get("photoUrl") ?? "",
    links: formData.get("links") ?? "",
    featured: formData.get("featured") === "on",
    contentStatus: formData.get("contentStatus"),
  });

  const links = await parseLinks(data.links ?? "");

  return {
    slug: data.slug,
    name: data.name,
    alias: data.alias || null,
    role: data.role || null,
    quirk: data.quirk || null,
    howWeMet: data.howWeMet || null,
    whatTheyDid: data.whatTheyDid || null,
    photoUrl: data.photoUrl || null,
    links: links.length > 0 ? links : undefined,
    featured: data.featured ?? false,
    contentStatus: data.contentStatus,
  };
}

export async function createPerson(formData: FormData) {
  await requireStaff();
  const data = await parseForm(formData);

  await prisma.person.create({
    data: {
      ...data,
      publishedAt: data.contentStatus === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/people");
  revalidatePath("/crew");
  redirect("/admin/people");
}

export async function updatePerson(id: string, formData: FormData) {
  await requireStaff();
  const data = await parseForm(formData);
  const existing = await prisma.person.findUnique({ where: { id } });

  await prisma.person.update({
    where: { id },
    data: {
      ...data,
      publishedAt:
        data.contentStatus === "PUBLISHED"
          ? (existing?.publishedAt ?? new Date())
          : (existing?.publishedAt ?? null),
    },
  });

  revalidatePath("/admin/people");
  revalidatePath("/crew");
  revalidatePath(`/crew/${data.slug}`);
  redirect("/admin/people");
}

export async function deletePerson(id: string) {
  await requireStaff();
  await prisma.person.delete({ where: { id } });
  revalidatePath("/admin/people");
  revalidatePath("/crew");
}
