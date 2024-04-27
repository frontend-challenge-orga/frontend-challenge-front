"use server";

import { getFileLink } from "@/core/infrastructure/services/dropbox.service";
import * as z from "zod";
import { userAction } from "@/config/libs/next-safe-action";
import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";

const schema = z.object({
  pathFile: z.string(),
  type: z.enum(["figma", "starter"]),
});

export const downloadFileAction = userAction(schema, async (data, ctx) => {
  const { pathFile } = data;

  if (data.type === "figma" && ctx.userSubscriptionDuration !== "YEARLY") {
    await creditRepository.subtractDesignCredits(ctx.userId, 1);
  }

  const payload = await getFileLink(pathFile);

  return {
    starter_file_url: payload,
  };
});
