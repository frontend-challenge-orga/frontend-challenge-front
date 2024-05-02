import { dropboxService } from "@/core/infrastructure/services/dropbox.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { ACTION_ERROR, FILE_TYPE, SUBSCRIPTION } from "@/config/constants";

type ExecuteDownloadFile = {
  userId: string;
  challengeId: string | undefined;
  pathFile: string;
  typeFile: "FIGMA" | "STARTER";
};

export const executeDownloadFile = async ({
  userId,
  challengeId,
  pathFile,
  typeFile,
}: ExecuteDownloadFile) => {
  const { subscription_duration } =
    await subscriptionService.getSubscriptionByUserId(userId);

  const isFigmaType = typeFile === FILE_TYPE.FIGMA;
  const isMonthlySubscription = subscription_duration === SUBSCRIPTION.MONTHLY;
  const isCreditableFile = isFigmaType && isMonthlySubscription;

  const challengeStarted = await userChallengeService.getStartedChallenge(
    userId,
    challengeId!,
  );

  const alreadyUnlockedFigmaFile = challengeStarted?.figma_file_unlocked;

  if (isCreditableFile && !alreadyUnlockedFigmaFile) {
    const userCredits = await creditService.getCreditByUserId(userId);
    const hasEnoughCredits = userCredits.design_amount > 0;

    if (!hasEnoughCredits) {
      throw new Error(ACTION_ERROR.INSUFFICIENT_DESIGN_CREDITS);
    }

    await creditService.subtractDesignCredits(userId, 1);
    await userChallengeService.unlockFigmaFile(userId, challengeId!);
  }

  return await dropboxService.getTemporaryFileLink(pathFile);
};
