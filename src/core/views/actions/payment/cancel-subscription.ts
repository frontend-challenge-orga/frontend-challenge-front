"use server";

import { ServerActionError, userAction } from "@/config/libs/next-safe-action";
import { ACTION_ERROR } from "@/config/constants";
import { stripeService } from "@/core/infrastructure/services/stripe.service";
import * as z from "zod";

const schema = z.object({});

export const cancelSubscriptionAction = userAction(schema, async (_, ctx) => {
  try {
    await stripeService.suspendSubscription(ctx.userId);
  } catch (error) {
    throw new ServerActionError(ACTION_ERROR.CANCEL_SUBSCRIPTION);
  }
});
