import { db } from "@/config/server/db";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import type { IChallengeSolutionRepository } from "@/core/domain/repositories/challenge.repository";

export const challengeSolutionRepository: IChallengeSolutionRepository = {
  createChallengeSolution: async (data) => {
    const challengeSolution = ChallengeSolutionTransformer.toEntity(data);

    return db.challengeSolution.create({
      data: challengeSolution,
    });
  },

  findByChallengeSlug: async (slug) => {
    return db.challengeSolution.findMany({
      where: {
        challenge: {
          slug,
        },
      },
    });
  },

  findByChallengeId: async (id: string) => {
    return db.challengeSolution.findMany({
      where: {
        id,
      },
    });
  },

  hasUserSubmittedSolution: async (userId, slug) => {
    const challengeSolution = await db.challengeSolution.findFirst({
      where: {
        userId,
        challenge: {
          slug,
        },
      },
    });

    return !!challengeSolution;
  },
};
