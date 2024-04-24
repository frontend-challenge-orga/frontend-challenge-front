import type { Subscription } from "@/domain/models/subscription.model";

export function isSubscriptionActive(subscription: Subscription): boolean {
  const currentDate = new Date();
  return (
    subscription.subscribed &&
    (!subscription.subscription_end_at ||
      subscription.subscription_end_at > currentDate)
  );
}
