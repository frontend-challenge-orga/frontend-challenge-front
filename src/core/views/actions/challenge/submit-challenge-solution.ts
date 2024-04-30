"use server";
import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";
import { userAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/challenge/forms/challenge-solution-schema";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import { awardPointsForChallenge } from "@/core/infrastructure/use-cases/award-points-for-challenge";
import * as z from "zod";

const schema = formSchema.extend({
  challengeId: z.string(),
  challengePoints: z.number(),
});

export const submitChallengeSolutionAction = userAction(
  schema,
  async (data, ctx) => {
    const { challengePoints, ...rest } = data;

    const challengeSolution = ChallengeSolutionTransformer.toDomain({
      ...rest,
      id: crypto.randomUUID(),
      userId: ctx.userId,
      stacks: rest.stacks.map((stack) => stack),
      challengeId: rest.challengeId,
    });

    const response =
      await challengeSolutionService.createChallengeSolution(challengeSolution);

    if (response) {
      await awardPointsForChallenge(
        ctx.userId,
        ctx.userPoints,
        challengePoints,
        challengeSolution.id,
      );
    }
  },
);
