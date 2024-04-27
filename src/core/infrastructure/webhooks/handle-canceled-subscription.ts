import { mailingService } from "@/core/infrastructure/services/resend.service";
import { subscriptionRepository } from "@/core/infrastructure/repositories/subscription.repository";
import { suspendSubscription } from "@/core/infrastructure/services/stripe.service";

export async function handleCanceledSubscription(
  userId: string,
  userEmail: string,
) {
  const subscription = await subscriptionRepository.show(userId);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const payload_subscription = await suspendSubscription(
    subscription.subscription_id,
  );

  await subscriptionRepository.cancel(userId);
  await mailingService(userEmail).sendCancellationSubscriptionConfirmation();

  return {
    cancel_at: new Date(payload_subscription.cancel_at! * 1000),
  };
}
