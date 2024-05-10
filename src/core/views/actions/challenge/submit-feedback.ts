"use server";

import { ServerActionError, userAction } from "@/config/libs/next-safe-action";
import { ACTION_ERROR } from "@/config/constants";
import { feedbackService } from "@/core/infrastructure/services/feedback.service";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const schema = z.object({
  comment: z.string(),
  solutionId: z.string(),
  slug: z.string(),
});

export const submitFeedbackAction = userAction(schema, async (data, ctx) => {
  try {
    await feedbackService.createFeedback({
      id: crypto.randomUUID(),
      comment: data.comment,
      rating: 0,
      userId: ctx.userId,
      challengeSolutionId: data.solutionId,
    });
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.SUBMIT_FEEDBACK);
  }

  revalidatePath(`/challenges/${data.slug}/solutions/${data.solutionId}`);
});
