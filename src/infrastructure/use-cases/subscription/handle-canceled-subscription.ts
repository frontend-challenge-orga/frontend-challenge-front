import subscriptionRepository from "@/infrastructure/data-access/subscription";
import { suspendSubscription } from "@/infrastructure/third-party-services/stripe.service";
import { sendCancellationSubscriptionEmail } from "@/infrastructure/third-party-services/resend.service";

export async function handleCanceledSubscription(
  userId: string,
  userEmail: string,
) {
  const subscription = await subscriptionRepository.getSubscription(userId);

  const payload_subscription = await suspendSubscription(
    subscription?.subscription_id!,
  );

  await subscriptionRepository.cancelSubscription(userId);
  await sendCancellationSubscriptionEmail(userEmail);

  return {
    cancel_at: new Date(payload_subscription.cancel_at! * 1000),
  };
}
