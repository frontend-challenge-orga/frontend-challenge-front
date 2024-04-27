import * as z from "zod";

import { DIFFICULTY, LANGUAGE } from "@/config/constants";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  language: z.enum(LANGUAGE),
  difficulty: z.enum(DIFFICULTY),
  brief: z.string().min(1, "Brief is required"),
  tips: z.string().min(1, "Tips is required"),
  assets_presentation: z.object({ value: z.string() }).array().min(1),
  premium: z.boolean(),
  starter_code_path_file: z.string(),
  starter_figma_path_file: z.string(),
});
