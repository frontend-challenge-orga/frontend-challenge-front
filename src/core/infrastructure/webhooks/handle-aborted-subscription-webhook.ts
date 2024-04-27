import { mailingService } from "@/core/infrastructure/services/resend.service";
import { subscriptionRepository } from "@/core/infrastructure/repositories/subscription.repository";
import type Stripe from "stripe";

export async function handleAbortedSubscriptionWebhook(
  subscription: Stripe.Subscription,
) {
  if (!subscription.metadata) {
    throw new Error("Missing required subscription metadata");
  }

  if (!subscription.metadata.userID) {
    throw new Error("Missing required user ID");
  }

  if (!subscription.metadata.customer_email) {
    throw new Error("Missing required customer email");
  }

  await subscriptionRepository.show(subscription.metadata.userID);
  await subscriptionRepository.cancel(subscription.metadata.userID);
  await mailingService(
    subscription.metadata.customer_email,
  ).sendAbortedSubscription();
}
