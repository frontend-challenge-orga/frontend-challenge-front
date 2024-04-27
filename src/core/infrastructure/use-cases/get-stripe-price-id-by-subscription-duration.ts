import { env } from "@/config/env";
import type { SubscriptionDurationType } from "@/config/types";

export function getStripePriceIdBySubscriptionDuration(
  subscriptionDuration: SubscriptionDurationType,
): string {
  return subscriptionDuration === "MONTHLY"
    ? env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
    : env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID;
}
