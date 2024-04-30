"use server";

import * as z from "zod";
import { userAction, ServerActionError } from "@/config/libs/next-safe-action";
import { startChallenge } from "@/core/infrastructure/use-cases/start-challenge";
import { revalidatePath } from "next/cache";
import { ACTION_ERROR } from "@/config/constants";

const schema = z.object({
  challengeId: z.string(),
  premium: z.boolean(),
});

export const startChallengeAction = userAction(schema, async (data, ctx) => {
  try {
    await startChallenge(
      ctx.userId,
      ctx.userSubscriptionDuration,
      data.challengeId,
      data.premium,
    );

    revalidatePath(`challenges/${data.challengeId}`);
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.START_CHALLENGE);
  }
});
