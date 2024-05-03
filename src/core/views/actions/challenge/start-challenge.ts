"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/libs/next-safe-action";
import { executeStartChallenge } from "@/core/infrastructure/use-cases/execute-start-challenge";
import { handleActionError } from "@/core/views/actions/handle-action-error";
import { URL } from "@/config/constants";

const schema = z.object({
  challengeId: z.string(),

  /*isPremiumChallenge: z.boolean(),*/
});

export const startChallengeAction = userAction(schema, async (data, ctx) => {
  try {
    await executeStartChallenge({
      userId: ctx.userId,
      challengeId: data.challengeId,
      /*isPremiumChallenge: data.isPremiumChallenge,*/
    });
  } catch (error) {
    handleActionError(error as Error);
  }

  revalidatePath(`${URL.DASHBOARD_CHALLENGES}/${data.challengeId}`);
});
