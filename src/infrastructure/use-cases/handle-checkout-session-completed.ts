import subscriptionRepository from "@/infrastructure/data-access/subscription";
import { retrieveSubscription } from "@/infrastructure/third-party-services/stripe.service";
import { addMonthlySubscriptionCredit } from "@/infrastructure/use-cases/add-monthly-subscription-credit";
import { sendSubscriptionEmailConfirmation } from "@/infrastructure/third-party-services/resend.service";
import type Stripe from "stripe";

export async function handleCheckoutSessionCompletedWebHook(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription || !session.metadata) {
    throw new Error("Missing required session data");
  }

  if (!session.metadata.userID) {
    throw new Error("Missing required user ID");
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
  );
  await addMonthlySubscriptionCredit(session.metadata.userID);
  await sendSubscriptionEmailConfirmation(session.customer_email);
}
