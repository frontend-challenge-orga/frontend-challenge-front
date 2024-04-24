"use server";

import { userAction } from "@/config/libs/next-safe-action";
import { createCheckoutSession } from "@/infrastructure/third-party-services/stripe.service";

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

      return {
        url: checkoutSession.url,
      };
    } catch (error) {
      console.error("Error creating stripe session:", error);

      return {
        error: "Error creating stripe session",
      };
    }
  },
);
