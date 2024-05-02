"use server";

import { revalidatePath } from "next/cache";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { challengeService as challengeS } from "@/core/domain/services/challenge.service";
import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema as Schema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { URL } from "@/config/constants";
import * as z from "zod";

const formSchema = Schema.extend({
  id: z.string(),
});

export const updateChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    await challengeService.updateChallenge(data.id, {
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      points: challengeS.getPointsForChallengeDifficulty(data.difficulty),
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });

    revalidatePath(URL.DASHBOARD_CHALLENGES);
  },
);
