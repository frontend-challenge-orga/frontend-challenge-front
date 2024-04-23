import type Stripe from "stripe";
import { retrieveSubscription } from "@/third-party-services/stripe.service";
import { createSubscription } from "@/data-access/subscription";
import { addMonthlySubscriptionCredit } from "@/use-cases/add-monthly-subscription-credit";

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription || !session.metadata?.userID) {
    throw new Error("Missing required session data");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );

  await createSubscription(session.metadata.userID, subscription.id);
  await addMonthlySubscriptionCredit(session.metadata.userID);
}
