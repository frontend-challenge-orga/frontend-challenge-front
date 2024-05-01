import { mailingService } from "@/core/infrastructure/services/resend.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { addMonthlySubscriptionCredit } from "@/core/infrastructure/use-cases/add-monthly-subscription-credit";
import type { SubscriptionDurationType } from "@/config/types";
import type Stripe from "stripe";
import { handleCanceledSubscription } from "@/core/infrastructure/webhooks/handle-canceled-subscription";

export async function handleUpdatedSubscriptionWebhook(
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

  if (subscription.cancel_at) {
    await handleCanceledSubscription(
      subscription.metadata.userID,
      subscription.metadata.customer_email,
      new Date(subscription.cancel_at * 1000),
    );

    return;
  }

  await subscriptionService.createSubscription(
    subscription.metadata.userID,
    subscription.id,
    subscription.metadata.subscription_duration as SubscriptionDurationType,
    new Date(subscription.current_period_end * 1000),
  );

  await addMonthlySubscriptionCredit(subscription.metadata.userID);

  await mailingService(
    subscription.metadata.customer_email,
  ).sendSubscriptionConfirmation();
}
