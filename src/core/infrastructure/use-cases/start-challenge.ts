import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { SUBSCRIPTION } from "@/config/constants";
import { deductChallengeCredits } from "@/core/infrastructure/use-cases/deduct-challenge-credits";

export const startChallenge = async (
  userId: string,
  subscription_duration:
    | typeof SUBSCRIPTION.MONTHLY
    | typeof SUBSCRIPTION.YEARLY,
  challengeId: string,
  isPremiumChallenge: boolean,
) => {
  if (isPremiumChallenge && subscription_duration === SUBSCRIPTION.MONTHLY) {
    await deductChallengeCredits(userId);
  }

  await userChallengeService.startChallenge(userId, challengeId);
};
