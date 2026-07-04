import { z } from "zod";

export const realtyInquirySchema = z.object({
  listingSlug: z.string().optional(),
  name: z.string().min(2, "Please enter your name."),
  company: z.string().optional(),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email."),
  city: z.string().optional(),
  budget: z.string().optional(),
  purpose: z.enum(["INVESTMENT", "OWN_USE", "LEASING"]).optional(),
  message: z.string().optional(),
  confirmed: z
    .boolean()
    .refine((v) => v === true, "Please confirm you understand the appointment-only requirement."),
  fax: z.literal("").optional(),
});

export type RealtyInquiryValues = z.infer<typeof realtyInquirySchema>;
