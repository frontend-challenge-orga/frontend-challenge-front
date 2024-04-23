"use server";

import { userAction } from "@/config/libs/next-safe-action";
import { cancelSubscription } from "@/infrastructure/third-party-services/stripe.service";
import * as z from "zod";

const schema = z.object({
  subscriptionId: z.string(),
});

export const cancelSubscriptionAction = userAction(
  schema,
  async (data, ctx) => {
    try {
      const payload = await cancelSubscription(data.subscriptionId);

      return {
        status: "Subscription canceled",
        subscription: payload,
      };
    } catch (error) {
      console.error("Error canceling subscription:", error);

      return {
        error: "Error canceling subscription",
      };
    }
  },
);
