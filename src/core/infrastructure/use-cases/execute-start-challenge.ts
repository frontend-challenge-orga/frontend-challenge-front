import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { ACTION_ERROR, CHALLENGE_PRICE } from "@/config/constants";

import { db } from "@/config/server/db";
import { challengeService } from "@/core/infrastructure/services/challenge.service";

type ExecuteStartChallenge = {
  userId: string;
  challengeId: string;
};

export const executeStartChallenge = async ({ userId, challengeId }: ExecuteStartChallenge) => {
  const userLoggedIn = await db.session.findFirst({
    where: {
      userId,
    },
  });

  if (!userLoggedIn) {
    throw new Error(ACTION_ERROR.USER_NOT_LOGGED_IN);
  }

  const isPremiumChallenge = await challengeService.isPremiumChallenge(challengeId);

  if (isPremiumChallenge) {
    const userSubscription = await subscriptionService.getSubscriptionByUserId(userId);
    const userIsSubscribed = userSubscription.subscribed;

    if (!userIsSubscribed) {
      throw new Error(ACTION_ERROR.USER_HAS_NO_SUBSCRIPTION);
    }

    const userCredits = await creditService.getCreditByUserId(userId);
    const userChallengeCredits = userCredits.challenge_amount;
    const hasEnoughCredits = userChallengeCredits >= CHALLENGE_PRICE;

    if (!hasEnoughCredits) {
      throw new Error(ACTION_ERROR.INSUFFICIENT_CHALLENGE_CREDITS);
    }

    await creditService.subtractChallengeCredits(userId, CHALLENGE_PRICE);
  }

  await userChallengeService.startChallenge(userId, challengeId);
};
