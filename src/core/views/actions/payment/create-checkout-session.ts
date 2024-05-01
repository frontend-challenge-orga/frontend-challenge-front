"use server";

import { ServerActionError, userAction } from "@/config/libs/next-safe-action";
import { createCheckoutSession } from "@/core/infrastructure/services/stripe.service";
import { ACTION_ERROR } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  subscription_duration: z.enum(["MONTHLY", "YEARLY"]),
});

// TODO: Refactor userEmail optional chaining
// TODO: Refactor subscriptionDuration string

export const createCheckoutSessionAction = userAction(
  schema,
  async ({ subscription_duration }, ctx) => {
    try {
      const checkoutSession = await createCheckoutSession(
        ctx.userId,
        ctx.userEmail,
        subscription_duration,
      );

      return checkoutSession.url;
    } catch (error) {
      throw new ServerActionError(ACTION_ERROR.CREATE_CHECKOUT_SESSION);
    }
  },
);
