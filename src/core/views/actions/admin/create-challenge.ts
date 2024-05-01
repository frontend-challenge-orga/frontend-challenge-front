"use server";

import { revalidatePath } from "next/cache";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { ACTION_ERROR, URL } from "@/config/constants";
import { getPointsForDifficulty } from "@/core/infrastructure/use-cases/get-points-for-challenge-difficulty";
import { redirect } from "next/navigation";
import * as crypto from "node:crypto";

export const createChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    try {
      await challengeService.createChallenge({
        ...data,
        id: crypto.randomUUID(),
        slug: data.name.toLowerCase().replace(/ /g, "-"),
        points: getPointsForDifficulty(data.difficulty),
        assets_presentation: extractValuesFromArray(data.assets_presentation),
        createdById: ctx.userId,
      });
    } catch (error) {
      throw new ServerActionError(ACTION_ERROR.CREATE_CHALLENGE);
    }

    revalidatePath(URL.DASHBOARD_CHALLENGES);
    redirect(URL.DASHBOARD_CHALLENGES);
  },
);
