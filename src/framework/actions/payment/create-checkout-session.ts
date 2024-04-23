"use server";

import { userAction } from "@/config/libs/next-safe-action";
import { createCheckoutSession } from "@/third-party-services/stripe.service";

import * as z from "zod";

const schema = z.object({});

export const createCheckoutSessionAction = userAction(
  schema,
  async (_, ctx) => {
    try {
      const checkoutSession = await createCheckoutSession(ctx.userId);

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
