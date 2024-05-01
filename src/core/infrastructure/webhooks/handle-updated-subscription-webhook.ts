import { db } from "@/config/server/db";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { creditService } from "@/core/infrastructure/services/credit.service";
import { mailingService } from "@/core/infrastructure/services/resend.service";
import { handleCanceledSubscription } from "@/core/infrastructure/webhooks/handle-canceled-subscription";
import type { SubscriptionDurationType } from "@/config/types";
import type Stripe from "stripe";
import { webhookEventService } from "@/core/infrastructure/services/webhook.event.service";

export async function handleUpdatedSubscriptionWebhook(
  idempotencyKey: string | undefined | null,
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

  const existingEvent = await webhookEventService.findByIdempotency(
    idempotencyKey!,
  );

  if (existingEvent) {
    throw new Error("Event already processed");
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

  await creditService.addCredit(subscription.metadata.userID);

  await mailingService(
    subscription.metadata.customer_email,
  ).sendSubscriptionConfirmation();

  await db.webhookEvent.create({
    data: {
      event_type: "customer.subscription.updated",
      event_idempotency_key: idempotencyKey,
    },
  });
}
