"use server";

import * as z from "zod";
import { userAction } from "@/config/libs/next-safe-action";
import paymentService from "@/backend/services/payment.service";

const schema = z.object({
  subscriptionId: z.string(),
});

export const cancelSubscriptionAction = userAction(
  schema,
  async (data, ctx) => {
    try {
      const payload = await paymentService.cancelSubscription(
        data.subscriptionId,
      );

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
