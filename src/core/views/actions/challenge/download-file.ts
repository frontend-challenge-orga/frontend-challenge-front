"use server";

import { userAction } from "@/config/libs/next-safe-action";
import { handleActionError } from "@/core/views/actions/handle-action-error";
import { FIleType } from "@/config/constants";
import { FileDownloader } from "@/core/infrastructure/use-cases/file-downloader";
import * as z from "zod";

import { userService } from "@/core/infrastructure/services/user.service";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { creditService } from "@/core/infrastructure/services/credit.service";

FileDownloader.initialize({
  userService,
  challengeService,
  subscriptionService,
  userChallengeService,
  creditService,
});

const schema = z.object({
  challengeId: z.string(),
  fileType: z.enum([FIleType.FIGMA, FIleType.STARTER]),
});

export const downloadFileAction = userAction(schema, async ({ challengeId, fileType }, { userId }) => {
  try {
    return await FileDownloader.getInstance().do({
      userId,
      challengeId,
      fileType,
    });
  } catch (error) {
    handleActionError(error as Error);
  }
});
