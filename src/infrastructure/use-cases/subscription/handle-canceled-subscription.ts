import mailingService from "@/infrastructure/third-party-services/mailing/resend.service";
import subscriptionRepository from "@/infrastructure/data-access/subscription";
import { suspendSubscription } from "@/infrastructure/third-party-services/stripe.service";

export async function handleCanceledSubscription(
  userId: string,
  userEmail: string,
) {
  const subscription = await subscriptionRepository.getSubscription(userId);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const payload_subscription = await suspendSubscription(
    subscription.subscription_id,
  );

  await subscriptionRepository.cancelSubscription(userId);
  await mailingService.sendCancellationSubscriptionConfirmation(userEmail);

  return {
    cancel_at: new Date(payload_subscription.cancel_at! * 1000),
  };
}
