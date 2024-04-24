import subscriptionRepository from "@/infrastructure/data-access/subscription";
import { suspendSubscription } from "@/infrastructure/third-party-services/stripe.service";
import { sendCancellationSubscriptionEmail } from "@/infrastructure/third-party-services/resend.service";

export async function handleCancelCustomerSubscription(
  userId: string,
  userEmail: string,
) {
  const subscriptionId =
    await subscriptionRepository.getSubscriptionById(userId);
  const payload_subscription = await suspendSubscription(subscriptionId!);

  const response = await subscriptionRepository.cancelSubscription(
    userId,
    new Date(payload_subscription.cancel_at! * 1000),
  );

  if (!response) {
    throw new Error("Subscription not found");
  }

  await sendCancellationSubscriptionEmail(userEmail);

  return {
    cancel_at: new Date(payload_subscription.cancel_at! * 1000),
  };
}
