import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { ACTION_ERROR, SUBSCRIPTION } from "@/config/constants";

type ExecuteStartChallenge = {
  userId: string;
  challengeId: string;
  isPremiumChallenge: boolean;
};

export const executeStartChallenge = async ({ userId, challengeId, isPremiumChallenge }: ExecuteStartChallenge) => {
  if (isPremiumChallenge) {
    const userSubscription = await subscriptionService.getSubscriptionByUserId(userId);

    if (!userSubscription) {
      throw new Error(ACTION_ERROR.USER_HAS_NO_SUBSCRIPTION);
    }

    const isMonthlySubscription = userSubscription.subscription_duration === SUBSCRIPTION.MONTHLY;

    if (isMonthlySubscription) {
      const userCredits = await creditService.getCreditByUserId(userId);
      const hasEnoughCredits = userCredits.challenge_amount > 0;

      if (!hasEnoughCredits) {
        throw new Error(ACTION_ERROR.INSUFFICIENT_CHALLENGE_CREDITS);
      }

      await creditService.subtractChallengeCredits(userId, 1);
    }
  }

  await userChallengeService.startChallenge(userId, challengeId);
};
