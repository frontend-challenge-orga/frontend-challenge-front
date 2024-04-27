"use server";
import { revalidatePath } from "next/cache";
import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";

import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/core/views/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { URL } from "@/config/constants";

export const createChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    await challengeRepository.create({
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });

    revalidatePath(URL.DASHBOARD_CHALLENGES);
  },
);
