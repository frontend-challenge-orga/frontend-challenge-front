"use server";

import { ServerActionError, userAction } from "@/config/libs/next-safe-action";
import { ACTION_ERROR } from "@/config/constants";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { suspendSubscription } from "@/core/infrastructure/services/stripe.service";
import * as z from "zod";

const schema = z.object({});

export const cancelSubscriptionAction = userAction(schema, async (_, ctx) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(
      ctx.userId,
    );

    await suspendSubscription(subscription.subscription_id);
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.CANCEL_SUBSCRIPTION);
  }
});
