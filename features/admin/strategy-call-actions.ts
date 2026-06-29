"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin/require-staff";

export async function deleteStrategyCallBooking(id: string) {
  await requireStaff();
  await prisma.strategyCallBooking.delete({ where: { id } });
  revalidatePath("/admin/strategy-calls");
}
