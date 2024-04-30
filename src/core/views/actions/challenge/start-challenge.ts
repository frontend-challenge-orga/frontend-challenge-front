"use server";

import * as z from "zod";
import { userAction } from "@/config/libs/next-safe-action";
import { startChallenge } from "@/core/infrastructure/use-cases/start-challenge";
import { revalidatePath } from "next/cache";

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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  revalidatePath(`challenges/${data.challengeId}`);
});
