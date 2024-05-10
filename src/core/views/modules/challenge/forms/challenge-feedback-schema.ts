import * as z from "zod";

export const formSchema = z.object({
  comment: z.string().min(3).max(800),
});
