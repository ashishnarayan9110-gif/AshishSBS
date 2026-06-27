import { z } from "zod";

export const contactReasons = [
  "COLLABORATION",
  "CONSULTING",
  "SPEAKING",
  "PARTNERSHIP",
  "GENERAL_INQUIRY",
  "MEDIA",
] as const;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Enter a valid email address"),
  reason: z.enum(contactReasons),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  company: z.string().max(200).optional().or(z.literal("")),
  website: z.string().max(300).optional().or(z.literal("")),
  phone: z.string().max(50).optional().or(z.literal("")),
  // Honeypot field — real users never fill this in.
  fax: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
