"use server";
import { challengeSolutionRepository } from "@/core/infrastructure/repositories/challenge.solution.repository";
import * as z from "zod";

import { userAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/challenge/forms/challenge-solution-schema";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";

const schema = formSchema.extend({
  challengeId: z.number(),
});

export const createChallengeSolutionAction = userAction(
  schema,
  async (data, ctx) => {
    try {
      const challengeSolution = ChallengeSolutionTransformer.toDomain({
        ...data,
        stacks: ["Nextjs"],
        userId: ctx.userId,
        challengeId: data.challengeId,
      });

      await challengeSolutionRepository.create(challengeSolution);
    } catch (error) {
      /*throw new Error("Failed to submit challenge solution");*/
      console.error(error);
    }
  },
);
