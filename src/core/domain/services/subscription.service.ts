import type { Subscription } from "@/core/domain/entities/subscription.entity";

export const subscriptionService = (subscription: Subscription) => ({
  checkSubscriptionActive: () => {
    const currentDate = new Date();
    return (
      subscription.subscribed &&
      (!subscription.subscription_end_at ||
        subscription.subscription_end_at > currentDate)
    );
  },
});
