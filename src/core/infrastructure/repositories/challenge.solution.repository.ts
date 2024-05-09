import { db } from "@/config/server/db";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import type { IChallengeSolutionRepository } from "@/core/domain/repositories/challenge.solution.repository";

export const challengeSolutionRepository: IChallengeSolutionRepository = {
  index: async () => {
    return db.challengeSolution.findMany({
      include: {
        user: true,
        challenge: true,
      },
    });
  },

  createChallengeSolution: async (data) => {
    const challengeSolution = ChallengeSolutionTransformer.toCreate(data);

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
      include: {
        user: true,
        challenge: true,
      },
    });
  },

  findByChallengeId: async (id: string) => {
    return db.challengeSolution.findMany({
      where: {
        id,
      },
      include: {
        user: true,
        challenge: true,
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
