"use server";

import { userAction } from "@/config/libs/next-safe-action";
import { handleCanceledSubscription } from "@/core/infrastructure/webhooks/handle-canceled-subscription";
import * as z from "zod";

const schema = z.object({});

export const cancelSubscriptionAction = userAction(schema, async (_, ctx) => {
  try {
    const { cancel_at } = await handleCanceledSubscription(
      ctx.userId,
      ctx.userEmail,
    );

    return {
      customer_canceled_at: cancel_at,
    };
  } catch (error) {
    console.error("Error canceling subscription:", error);

    return {
      error: "Error canceling subscription",
    };
  }
});
