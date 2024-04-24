import { suspendSubscription } from "@/infrastructure/third-party-services/stripe.service";
import subscriptionRepository from "@/infrastructure/data-access/subscription";

export async function handleCancelCustomerSubscription(userId: string) {
  const subscriptionId = await subscriptionRepository.getSubscriptionId(userId);
  const payload_subscription = await suspendSubscription(subscriptionId!);

  await subscriptionRepository.cancelSubscription(
    userId,
    new Date(payload_subscription.cancel_at! * 1000),
  );

  return {
    cancel_at: new Date(payload_subscription.cancel_at! * 1000),
  };
}
