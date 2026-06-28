"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

export async function deleteContactSubmission(id: string) {
  await requireStaff();
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/contact");
}
