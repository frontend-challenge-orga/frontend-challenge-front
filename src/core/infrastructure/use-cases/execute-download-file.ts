import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { ACTION_ERROR, DESIGN_PRICE, FileType } from "@/config/constants";

import { db } from "@/config/server/db";
import { challengeService } from "@/core/infrastructure/services/challenge.service";

type ExecuteDownloadFile = {
  userId: string;
  challengeId: string;
  typeFile: "FIGMA" | "STARTER";
};

export const executeDownloadFile = async ({ userId, challengeId, typeFile }: ExecuteDownloadFile) => {
  const userLoggedIn = await db.session.findFirst({
    where: {
      userId,
    },
  });

  if (!userLoggedIn) {
    throw new Error(ACTION_ERROR.USER_NOT_LOGGED_IN);
  }

  const isFigmaType = typeFile === FileType.FIGMA;
  const isYearlySubscribed = await subscriptionService.isYearlySubscribed(userId);
  const isPremiumChallenge = await challengeService.isPremiumChallenge(challengeId);
  const alreadyUnlockedFigmaFile = await userChallengeService.alreadyUnlockedFigmaFile(userId, challengeId);

  const isCreditableFile = isFigmaType && !isPremiumChallenge && !isYearlySubscribed && !alreadyUnlockedFigmaFile;

  if (isCreditableFile) {
    const userCredits = await creditService.userDesignCredits(userId);
    const hasEnoughCredits = userCredits >= DESIGN_PRICE;

    if (!hasEnoughCredits) {
      throw new Error(ACTION_ERROR.INSUFFICIENT_DESIGN_CREDITS);
    }

    await creditService.subtractDesignCredits(userId, 1);
    await userChallengeService.unlockFigmaFile(userId, challengeId);
  }

  const fileLink = await db.challenge.findFirst({
    where: {
      id: challengeId,
    },
    select: {
      starter_code_path_file: true,
      starter_figma_path_file: true,
    },
  });

  if (!fileLink) {
    throw new Error(ACTION_ERROR.FILE_NOT_FOUND);
  }

  return isFigmaType ? fileLink.starter_figma_path_file : fileLink.starter_code_path_file;
};
