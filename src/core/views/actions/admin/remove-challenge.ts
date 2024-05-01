"use server";

import { revalidatePath } from "next/cache";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { ACTION_ERROR, URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  challengeId: z.string(),
});

export const removeChallengeAction = adminAction(schema, async (data, _) => {
  try {
    await challengeService.removeChallenge(data.challengeId);
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.REMOVE_CHALLENGE);
  }

  revalidatePath(URL.DASHBOARD_CHALLENGES);
});
