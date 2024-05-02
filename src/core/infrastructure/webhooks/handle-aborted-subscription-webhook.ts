import { mailingService } from "@/core/infrastructure/services/resend.service";
import { subscriptionRepository } from "@/core/infrastructure/repositories/subscription.repository";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import type Stripe from "stripe";

export async function handleAbortedSubscriptionWebhook(
  subscription: Stripe.Subscription,
) {
  const payload = await subscriptionService.getSubscriptionByUserId(
    subscription.metadata.userID!,
  );

  if (!payload) {
    throw new Error("Subscription not found");
  }

  await subscriptionRepository.cancel(subscription.metadata.userID!);
  await mailingService(
    subscription.metadata.customer_email!,
  ).sendAbortedSubscription();
}
