import { z } from "zod";

export const founderStages = [
  "IDEA_ONLY",
  "PRE_LAUNCH",
  "REGISTERED",
  "GENERATING_REVENUE",
] as const;

export const strategyCallSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(50).optional().or(z.literal("")),
  question: z.string().min(10, "Be specific about what you want to solve.").max(1000),
  triedSoFar: z.string().min(1, "Let us know what you've already tried.").max(1000),
  stage: z.enum(founderStages),
  fax: z.string().max(0).optional().or(z.literal("")),
});

export type StrategyCallValues = z.infer<typeof strategyCallSchema>;
