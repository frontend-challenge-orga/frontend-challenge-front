import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { ACTION_ERROR, SUBSCRIPTION } from "@/config/constants";

type ExecuteStartChallenge = {
  userId: string;
  challengeId: string;
  isPremiumChallenge: boolean;
};

export const executeStartChallenge = async ({
  userId,
  challengeId,
  isPremiumChallenge,
}: ExecuteStartChallenge) => {
  const { subscription_duration } =
    await subscriptionService.getSubscriptionByUserId(userId);

  const isMonthlySubscription = subscription_duration === SUBSCRIPTION.MONTHLY;
  const isCreditableChallenge = isPremiumChallenge && isMonthlySubscription;

  if (isCreditableChallenge) {
    const userCredits = await creditService.getCreditByUserId(userId);
    const hasEnoughCredits = userCredits.challenge_amount > 0;

    if (!hasEnoughCredits) {
      throw new Error(ACTION_ERROR.INSUFFICIENT_CHALLENGE_CREDITS);
    }

    await creditService.subtractChallengeCredits(userId, 1);
  }

  await userChallengeService.startChallenge(userId, challengeId);
};
