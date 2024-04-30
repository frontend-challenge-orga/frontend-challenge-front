"use server";

import { revalidatePath } from "next/cache";
import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema as Schema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { URL } from "@/config/constants";
import * as z from "zod";
import { getPointsForDifficulty } from "@/core/infrastructure/use-cases/get-points-for-challenge-difficulty";

const formSchema = Schema.extend({
  id: z.string(),
});

export const updateChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    await challengeRepository.update(data.id, {
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      points: getPointsForDifficulty(data.difficulty),
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });

    revalidatePath(URL.DASHBOARD_CHALLENGES);
  },
);
