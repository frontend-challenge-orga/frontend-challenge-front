import type { UserChallengeDTO } from "@/core/infrastructure/dto/user.challenge.dto";
import { userChallengeRepository } from "@/core/infrastructure/repositories/user.challenge.repository";
import { UserChallengeTransformer } from "@/core/infrastructure/transformers/user-challenge-transformer";

export interface IUserChallengeService {
  getStartedChallenge(userId: string, challengeId: string): Promise<UserChallengeDTO | null>;
  getStartedChallengeBySlug(userId: string, challengeSlug: string): Promise<UserChallengeDTO | null>;
  startChallenge(userId: string, challengeId: string): Promise<UserChallengeDTO | undefined>;
  unlockFigmaFile(userId: string, challengeId: string): Promise<UserChallengeDTO | undefined>;
  hasUserStartedChallenge(userId: string | undefined, slug: string): Promise<boolean>;
  alreadyUnlockedFigmaFile(userId: string, challengeId: string): Promise<boolean | null | undefined>;
}

export const userChallengeService: IUserChallengeService = {
  getStartedChallenge: async (userId: string, challengeId: string) => {
    return userChallengeRepository.showById(userId, challengeId).then((userChallenge) => {
      return userChallenge ? UserChallengeTransformer.toEntity(userChallenge) : null;
    });
  },

  getStartedChallengeBySlug: async (userId, challengeSlug) => {
    return userChallengeRepository.showBySlug(userId, challengeSlug).then((userChallenge) => {
      return userChallenge ? UserChallengeTransformer.toEntity(userChallenge) : null;
    });
  },

  startChallenge: async (userId, challengeId) => {
    return userChallengeRepository.create(userId, challengeId).then((userChallenge) => {
      return UserChallengeTransformer.toEntity(userChallenge);
    });
  },

  unlockFigmaFile: async (userId, challengeId) => {
    return userChallengeRepository.unlockFigmaFile(userId, challengeId).then((userChallenge) => {
      return UserChallengeTransformer.toEntity(userChallenge);
    });
  },

  hasUserStartedChallenge: async (userId, challengeSlug) => {
    if (!userId) return Promise.resolve(false);

    return userChallengeRepository.showBySlug(userId, challengeSlug).then((userChallenge) => {
      return !!userChallenge;
    });
  },

  alreadyUnlockedFigmaFile: async (userId, challengeId) => {
    return userChallengeRepository.showById(userId, challengeId).then((userChallenge) => {
      return userChallenge?.figma_file_unlocked;
    });
  },
};
