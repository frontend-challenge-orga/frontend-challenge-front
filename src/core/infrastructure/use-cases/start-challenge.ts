import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";
import { userChallengeRepository } from "@/core/infrastructure/repositories/user-challenge.repository";

export const startChallenge = async (
  userId: string,
  challengeId: number,
  isPremiumChallenge: boolean,
) => {
  if (isPremiumChallenge) {
    await creditRepository.subtractChallengeCredits(userId, 1);
  }

  await userChallengeRepository.startChallenge(userId, challengeId);
};
