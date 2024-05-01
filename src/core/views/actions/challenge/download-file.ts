"use server";

import { deductDesignCredits } from "@/core/infrastructure/use-cases/deduct-design-credits";
import { ServerActionError, userAction } from "@/config/libs/next-safe-action";
import { getTemporaryFileLink } from "@/core/infrastructure/services/dropbox.service";
import { FILE_TYPE, SUBSCRIPTION } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  pathFile: z.string(),
  type: z.enum([FILE_TYPE.FIGMA, FILE_TYPE.STARTER]),
});

export const downloadFileAction = userAction(schema, async (data, ctx) => {
  try {
    const file_url = await getTemporaryFileLink(data.pathFile);

    const isFigmaType = data.type === FILE_TYPE.FIGMA;
    const isNotYearlySubscription =
      ctx.userSubscriptionDuration !== SUBSCRIPTION.YEARLY;

    if (isFigmaType && isNotYearlySubscription) {
      await deductDesignCredits(ctx.userId, ctx.userCreditDesignAmount);
    }

    return file_url;
  } catch (error) {
    if (error instanceof ServerActionError)
      throw new ServerActionError(error.message);

    throw error;
  }
});
