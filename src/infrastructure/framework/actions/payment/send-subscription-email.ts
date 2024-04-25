"use server";

import { userAction } from "@/config/libs/next-safe-action";
import mailingService from "@/infrastructure/third-party-services/mailing/resend.service";
import * as z from "zod";

const schema = z.object({});

export const sendSubscriptionConfirmationAction = userAction(
  schema,
  async (_, ctx) => {
    await mailingService.sendSubscriptionConfirmation(ctx.userEmail);
  },
);
