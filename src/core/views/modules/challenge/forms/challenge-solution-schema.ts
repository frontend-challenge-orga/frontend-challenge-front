import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(70),
  repository_url: z.string().url(),
  live_preview_url: z.string().url(),
  stacks: z.string(),
  solution_retrospective: z.string().min(3).max(800),
});
