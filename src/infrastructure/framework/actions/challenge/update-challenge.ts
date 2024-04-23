"use server";

import { revalidatePath } from "next/cache";
import { updateChallenge } from "@/infrastructure/data-access/challenge";
import { adminAction } from "@/config/libs/next-safe-action";
import { formSchema as Schema } from "@/infrastructure/framework/modules/admin/forms/create-challenge-schema";
import { extractValuesFromArray } from "@/config/utils";
import { URL } from "@/config/constants";
import * as z from "zod";

const formSchema = Schema.extend({
  id: z.number(),
});

export const updateChallengeAction = adminAction(
  formSchema,
  async (data, ctx) => {
    await updateChallenge(data.id, {
      ...data,
      assets_presentation: extractValuesFromArray(data.assets_presentation),
      createdById: ctx.userId,
    });

    revalidatePath(URL.DASHBOARD_CHALLENGES);
  },
);
