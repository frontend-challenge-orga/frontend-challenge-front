"use server";
import { revalidatePath } from "next/cache";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { ChallengeTransformer } from "@/core/infrastructure/transformers/challenge-transformer";

import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { URL } from "@/config/constants";

export const createChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    const challenge = ChallengeTransformer.toDomain({
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });

    await challengeService.createChallenge(challenge);

    revalidatePath(URL.DASHBOARD_CHALLENGES);
  },
);
