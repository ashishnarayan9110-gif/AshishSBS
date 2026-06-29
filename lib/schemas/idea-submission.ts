import { z } from "zod";

export const ideaSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  businessIdea: z
    .string()
    .min(10, "Describe your idea in at least one full sentence.")
    .max(1000),
  targetCustomer: z.string().min(3, "Tell us who this is for.").max(500),
  problem: z.string().min(10, "Describe the problem you're solving.").max(1000),
  biggestChallenge: z
    .string()
    .min(10, "Describe your biggest challenge right now.")
    .max(1000),
  // Honeypot — real users never fill this in.
  fax: z.string().max(0).optional().or(z.literal("")),
});

export type IdeaSubmissionValues = z.infer<typeof ideaSubmissionSchema>;
