import subscriptionRepository from "@/infrastructure/data-access/subscription";
import { retrieveSubscription } from "@/infrastructure/third-party-services/stripe.service";
import { addMonthlySubscriptionCredit } from "@/infrastructure/use-cases/add-monthly-subscription-credit";
import { sendSubscriptionEmailConfirmation } from "@/infrastructure/third-party-services/resend.service";
import type { SubscriptionDurationEnum } from "@/config/types";
import type Stripe from "stripe";

export async function handleCheckoutSessionCompletedWebHook(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription || !session.metadata) {
    throw new Error("Missing required session data");
  }

  if (!session.metadata.userID || !session.metadata.subscription_duration) {
    throw new Error("Missing required metadata fields");
  }

  if (!session.customer_email) {
    throw new Error("Missing required customer email");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );

  await subscriptionRepository.createSubscription(
    session.metadata.userID,
    subscription.id,
    session.metadata.subscription_duration as SubscriptionDurationEnum,
  );
  await addMonthlySubscriptionCredit(session.metadata.userID);
  await sendSubscriptionEmailConfirmation(session.customer_email);
}
