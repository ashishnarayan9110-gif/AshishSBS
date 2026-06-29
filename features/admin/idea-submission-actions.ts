"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

export async function deleteIdeaSubmission(id: string) {
  await requireStaff();
  await prisma.ideaSubmission.delete({ where: { id } });
  revalidatePath("/admin/idea-submissions");
}
