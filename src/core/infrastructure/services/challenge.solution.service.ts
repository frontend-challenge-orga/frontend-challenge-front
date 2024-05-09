import { challengeSolutionRepository } from "@/core/infrastructure/repositories/challenge.solution.repository";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import type { ChallengeSolutionDTO, ChallengeSolutionViewDTO } from "@/core/infrastructure/dto/challenge.solution.dto";
import type { ChallengeSolution } from "@/core/domain/entities/challenge.solution.entity";

interface IChallengeSolutionService {
  getChallengeSolutions: () => Promise<ChallengeSolutionViewDTO[]>;
  createChallengeSolution: (data: ChallengeSolutionDTO) => Promise<ChallengeSolutionDTO>;
  findByChallengeSlug: (slug: string) => Promise<ChallengeSolutionDTO[]>;
  findByChallengeId: (challengeId: string) => Promise<ChallengeSolutionDTO[]>;
  hasUserSubmittedSolution: (userId: string, slug: string) => Promise<boolean>;
  hasUserCompletedChallenge: (userId: string, challengeId: string) => Promise<boolean>;
  getCompletedChallenges: (userId: string) => Promise<ChallengeSolutionDTO[]>;
}

export const challengeSolutionService: IChallengeSolutionService = {
  getChallengeSolutions: async () => {
    return challengeSolutionRepository.index().then((challengeSolutions) => {
      return challengeSolutions?.map((challengeSolution: ChallengeSolution) => {
        return ChallengeSolutionTransformer.toView(challengeSolution);
      });
    });
  },

  createChallengeSolution: async (data) => {
    return challengeSolutionRepository.createChallengeSolution(data).then((challengeSolution) => {
      return ChallengeSolutionTransformer.toCreate(challengeSolution);
    });
  },

  findByChallengeSlug: async (slug) => {
    return challengeSolutionRepository.findByChallengeSlug(slug).then((challengeSolutions) => {
      return challengeSolutions?.map((challengeSolution: ChallengeSolution) => {
        return ChallengeSolutionTransformer.toEntity(challengeSolution);
      });
    });
  },

  findByChallengeId: async (challengeId) => {
    return challengeSolutionRepository.findByChallengeId(challengeId).then((challengeSolutions) => {
      return challengeSolutions?.map((challengeSolution: ChallengeSolution) => {
        return ChallengeSolutionTransformer.toEntity(challengeSolution);
      });
    });
  },

  hasUserSubmittedSolution: async (userId, slug) => {
    return challengeSolutionRepository.hasUserSubmittedSolution(userId, slug);
  },

  hasUserCompletedChallenge: async (userId, challengeId) => {
    return challengeSolutionRepository.findByChallengeSlug(challengeId).then((challengeSolutions) => {
      return challengeSolutions.some((challengeSolution) => challengeSolution.userId === userId);
    });
  },

  getCompletedChallenges: async (userId) => {
    return challengeSolutionRepository.index().then((challengeSolutions) => {
      return challengeSolutions
        .filter((challengeSolution) => challengeSolution.userId === userId)
        .map((challengeSolution) => {
          return ChallengeSolutionTransformer.toEntity(challengeSolution);
        });
    });
  },
};
