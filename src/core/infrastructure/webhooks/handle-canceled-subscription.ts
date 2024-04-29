import { mailingService } from "@/core/infrastructure/services/resend.service";
import { suspendSubscription } from "@/core/infrastructure/services/stripe.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";

export async function handleCanceledSubscription(
  userId: string,
  userEmail: string,
) {
  const subscription = await subscriptionService.getSubscriptionById(userId);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const payload_subscription = await suspendSubscription(
    subscription.subscription_id,
  );

  await subscriptionService.cancelSubscription(userId);
  await mailingService(userEmail).sendCancellationSubscriptionConfirmation();

  return {
    cancel_at: new Date(payload_subscription.cancel_at! * 1000),
  };
}
