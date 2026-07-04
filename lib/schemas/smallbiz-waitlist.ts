import { z } from "zod";

export const smallBizWaitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  fax: z.literal("").optional(),
});

export type SmallBizWaitlistValues = z.infer<typeof smallBizWaitlistSchema>;
