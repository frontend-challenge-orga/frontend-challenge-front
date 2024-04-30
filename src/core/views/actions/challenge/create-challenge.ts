"use server";
import { revalidatePath } from "next/cache";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { ChallengeTransformer } from "@/core/infrastructure/transformers/challenge-transformer";

import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { URL } from "@/config/constants";
import { getPointsForDifficulty } from "@/core/infrastructure/use-cases/get-points-for-challenge-difficulty";
import * as crypto from "node:crypto";

export const createChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    const challenge = ChallengeTransformer.toDomain({
      ...data,
      id: crypto.randomUUID(),
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      points: getPointsForDifficulty(data.difficulty),
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });

    await challengeService.createChallenge(challenge);

    revalidatePath(URL.DASHBOARD_CHALLENGES);
  },
);
