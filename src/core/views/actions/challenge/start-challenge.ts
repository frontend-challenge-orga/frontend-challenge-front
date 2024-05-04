"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/libs/next-safe-action";
import { handleActionError } from "@/core/views/actions/handle-action-error";
import { URL } from "@/config/constants";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { userService } from "@/core/infrastructure/services/user.service";
import { ChallengeStarter } from "@/core/infrastructure/use-cases/challenge-starter";

ChallengeStarter.initialize({
  userService,
  userChallengeService,
  challengeService,
  subscriptionService,
  creditService,
});

const schema = z.object({
  challengeId: z.string(),
});

export const startChallengeAction = userAction(schema, async (data, ctx) => {
  try {
    await ChallengeStarter.getInstance().do({
      userId: ctx.userId,
      challengeId: data.challengeId,
    });
  } catch (error) {
    handleActionError(error as Error);
  }

  revalidatePath(`${URL.DASHBOARD_CHALLENGES}/${data.challengeId}`);
});
