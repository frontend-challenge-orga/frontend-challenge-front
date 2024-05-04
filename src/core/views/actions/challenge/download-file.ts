"use server";

import { userAction } from "@/config/libs/next-safe-action";
import { executeDownloadFile } from "@/core/infrastructure/use-cases/execute-download-file";
import { handleActionError } from "@/core/views/actions/handle-action-error";
import { FILE_TYPE } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  challengeId: z.string(),
  type: z.enum([FILE_TYPE.FIGMA, FILE_TYPE.STARTER]),
});

export const downloadFileAction = userAction(schema, async (data, ctx) => {
  try {
    return await executeDownloadFile({
      userId: ctx.userId,
      challengeId: data.challengeId,
      typeFile: data.type,
    });
  } catch (error) {
    handleActionError(error as Error);
  }
});
