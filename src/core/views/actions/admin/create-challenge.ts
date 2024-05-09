"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { challengeService as challengeS } from "@/core/domain/services/challenge.service";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { ACTION_ERROR, URL } from "@/config/constants";
import * as crypto from "node:crypto";

export const createChallengeAction = adminAction(formSchema, async (data, ctx) => {
  try {
    await challengeService.createChallenge({
      ...data,
      id: crypto.randomUUID(),
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      points: challengeS.getPointsForChallengeDifficulty(data.difficulty),
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.CREATE_CHALLENGE);
  }

  revalidatePath(URL.DASHBOARD_CHALLENGES);
  redirect(URL.DASHBOARD_CHALLENGES);
});
