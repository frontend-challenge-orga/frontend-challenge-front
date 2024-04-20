"use server";

import challengeService from "@/backend/services/challenge.service";
import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";

export const createChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    await challengeService.createChallenge({
      ...data,
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });
  },
);
