"use server";

import { ServerActionError, userAction } from "@/config/libs/next-safe-action";
import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import { formSchema } from "@/core/views/modules/challenge/forms/challenge-solution-schema";
import { awardPointsForChallenge } from "@/core/infrastructure/use-cases/award-points-for-challenge";
import { ACTION_ERROR } from "@/config/constants";
import * as z from "zod";

const schema = formSchema.extend({
  challengeId: z.string(),
  challengePoints: z.number(),
});

export const submitChallengeSolutionAction = userAction(schema, async (data, ctx) => {
  try {
    const { challengePoints, ...rest } = data;

    const challengeSolution = ChallengeSolutionTransformer.toCreate({
      ...rest,
      id: crypto.randomUUID(),
      userId: ctx.userId,
      stacks: rest.stacks.map((stack) => stack),
      challengeId: rest.challengeId,
    });

    const challengeSolutionPayload = await challengeSolutionService.createChallengeSolution(challengeSolution);

    await awardPointsForChallenge(ctx.userId, ctx.userPoints, challengePoints, challengeSolutionPayload.id);
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.SUBMIT_CHALLENGE_SOLUTION);
  }
});
