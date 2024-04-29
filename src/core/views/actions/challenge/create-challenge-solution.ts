"use server";
import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";
import { userAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/challenge/forms/challenge-solution-schema";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import * as z from "zod";

const schema = formSchema.extend({
  challengeId: z.number(),
});

export const createChallengeSolutionAction = userAction(
  schema,
  async (data, ctx) => {
    const { stacks, challengeId } = data;

    const challengeSolution = ChallengeSolutionTransformer.toDomain({
      ...data,
      id: crypto.randomUUID(),
      userId: ctx.userId,
      stacks: stacks.map((stack) => stack),
      challengeId,
    });

    await challengeSolutionService.createChallengeSolution(challengeSolution);
  },
);
