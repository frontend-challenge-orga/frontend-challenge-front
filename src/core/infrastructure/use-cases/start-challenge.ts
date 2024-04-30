import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";
import { userChallengeRepository } from "@/core/infrastructure/repositories/user-challenge.repository";

export const startChallenge = async (
  userId: string,
  subscription_duration: "MONTHLY" | "YEARLY",
  challengeId: string,
  isPremiumChallenge: boolean,
) => {
  if (isPremiumChallenge && subscription_duration === "MONTHLY") {
    await creditRepository.subtractChallengeCredits(userId, 1);
  }

  await userChallengeRepository.startChallenge(userId, challengeId);
};
