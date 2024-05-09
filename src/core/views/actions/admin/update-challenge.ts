"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { challengeService as challengeS } from "@/core/domain/services/challenge.service";
import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema as Schema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { ServerActionError } from "@/config/libs/next-safe-action";
import { URL, ACTION_ERROR } from "@/config/constants";
import * as z from "zod";

const formSchema = Schema.extend({
  id: z.string(),
});

export const updateChallengeAction = adminAction(formSchema, async (data, ctx) => {
  try {
    await challengeService.updateChallenge(data.id, {
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      points: challengeS.getPointsForChallengeDifficulty(data.difficulty),
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.EDIT_CHALLENGE);
  }

  revalidatePath(URL.DASHBOARD_CHALLENGES);
  redirect(URL.DASHBOARD_CHALLENGES);
});
