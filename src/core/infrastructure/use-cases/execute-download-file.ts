import { dropboxService } from "@/core/infrastructure/services/dropbox.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { ACTION_ERROR, DESIGN_PRICE, FILE_TYPE } from "@/config/constants";

import { db } from "@/config/server/db";
import { challengeService } from "@/core/infrastructure/services/challenge.service";

type ExecuteDownloadFile = {
  userId: string;
  challengeId: string;
  pathFile: string;
  typeFile: "FIGMA" | "STARTER";
};

export const executeDownloadFile = async ({ userId, challengeId, pathFile, typeFile }: ExecuteDownloadFile) => {
  const userLoggedIn = await db.session.findFirst({
    where: {
      userId,
    },
  });

  if (!userLoggedIn) {
    throw new Error(ACTION_ERROR.USER_NOT_LOGGED_IN);
  }

  const isFigmaType = typeFile === FILE_TYPE.FIGMA;
  const isYearlySubscription = await subscriptionService.isYearlySubscription(userId);
  const isPremiumChallenge = await challengeService.isPremiumChallenge(challengeId);
  const alreadyUnlockedFigmaFile = await userChallengeService.alreadyUnlockedFigmaFile(userId, challengeId);

  const isCreditableFile = isFigmaType && !isPremiumChallenge && !isYearlySubscription && !alreadyUnlockedFigmaFile;

  if (isCreditableFile) {
    const userCredits = await creditService.userDesignCredits(userId);
    const hasEnoughCredits = userCredits >= DESIGN_PRICE;

    if (!hasEnoughCredits) {
      throw new Error(ACTION_ERROR.INSUFFICIENT_DESIGN_CREDITS);
    }

    await creditService.subtractDesignCredits(userId, 1);
    await userChallengeService.unlockFigmaFile(userId, challengeId);
  }

  return await dropboxService.getTemporaryFileLink(pathFile);
};
