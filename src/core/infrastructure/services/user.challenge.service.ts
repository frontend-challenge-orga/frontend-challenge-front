import type { UserChallengeDTO } from "@/core/infrastructure/dto/user.challenge.dto";
import { userChallengeRepository } from "@/core/infrastructure/repositories/user.challenge.repository";
import { UserChallengeTransformer } from "@/core/infrastructure/transformers/user-challenge-transformer";

interface IUserChallengeService {
  startChallenge(
    userId: string,
    challengeId: string,
  ): Promise<UserChallengeDTO | undefined>;
  hasUserStartedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<boolean>;
}

export const userChallengeService: IUserChallengeService = {
  startChallenge: async (userId, challengeId) => {
    return userChallengeRepository
      .startChallenge(userId, challengeId)
      .then((userChallenge) => {
        return UserChallengeTransformer.toEntity(userChallenge);
      });
  },

  hasUserStartedChallenge: async (userId, challengeId) => {
    return userChallengeRepository.hasUserStartedChallenge(userId, challengeId);
  },
};
