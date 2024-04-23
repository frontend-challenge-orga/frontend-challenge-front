"use server";

import { userAction } from "@/config/libs/next-safe-action";
import { sendSubscriptionEmailConfirmation } from "@/infrastructure/third-party-services/resend.service";
import * as z from "zod";

const schema = z.object({});

export const sendSubscriptionConfirmationAction = userAction(
  schema,
  async (_, ctx) => {
    await sendSubscriptionEmailConfirmation(ctx.userEmail);
  },
);
