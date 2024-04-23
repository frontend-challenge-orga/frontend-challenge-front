"use server";

import { createChallenge } from "@/infrastructure/data-access/challenge";
import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema } from "@/infrastructure/framework/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { URL } from "@/config/constants";
import { revalidatePath } from "next/cache";

export const createChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    await createChallenge({
      ...data,
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });

    revalidatePath(URL.DASHBOARD_CHALLENGES);
  },
);
