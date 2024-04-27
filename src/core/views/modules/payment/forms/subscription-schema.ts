import * as z from "zod";

export const formSchema = z.object({
  subscription_duration: z.boolean(),
});
