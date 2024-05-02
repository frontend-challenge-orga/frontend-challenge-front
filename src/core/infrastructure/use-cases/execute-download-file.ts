import { dropboxService } from "@/core/infrastructure/services/dropbox.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { FILE_TYPE, SUBSCRIPTION } from "@/config/constants";
import { creditService } from "@/core/infrastructure/services/credit.service";

type ExecuteDownloadFile = {
  userId: string;
  pathFile: string;
  typeFile: "FIGMA" | "STARTER";
};

export const executeDownloadFile = async ({
  userId,
  pathFile,
  typeFile,
}: ExecuteDownloadFile) => {
  const file_url = await dropboxService.getTemporaryFileLink(pathFile);

  const { subscription_duration } =
    await subscriptionService.getSubscriptionByUserId(userId);

  const isFigmaType = typeFile === FILE_TYPE.FIGMA;
  const isMonthlySubscription = subscription_duration === SUBSCRIPTION.MONTHLY;
  const isCreditableFile = isFigmaType && isMonthlySubscription;

  if (isCreditableFile) {
    const userCredits = await creditService.getCreditByUserId(userId);
    const hasEnoughCredits = userCredits.design_amount > 0;

    if (!hasEnoughCredits) {
      throw new Error("Insufficient design credits");
    }

    await creditService.subtractDesignCredits(userId, 1);
  }

  return file_url;
};
