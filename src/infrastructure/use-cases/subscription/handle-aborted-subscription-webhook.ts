import mailingService from "@/infrastructure/third-party-services/mailing/resend.service";
import subscriptionRepository from "@/infrastructure/data-access/subscription";
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

  await subscriptionRepository.getSubscription(subscription.metadata.userID);
  await subscriptionRepository.cancelSubscription(subscription.metadata.userID);
  await mailingService.sendAbortedSubscription(
    subscription.metadata.customer_email,
  );
}
