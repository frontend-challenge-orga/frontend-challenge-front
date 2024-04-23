import type Stripe from "stripe";
import { retrieveSubscription } from "@/third-party-services/stripe.service";
import { updateSubscription } from "@/data-access/subscription";
import { addMonthlySubscriptionCredit } from "@/use-cases/add-monthly-subscription-credit";

export async function handleInvoicePaymentSucceeded(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription || !session.metadata?.userID) {
    throw new Error("Missing required session data");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );
  await updateSubscription(session.metadata.userID);
  await addMonthlySubscriptionCredit(subscription.metadata.userID!);
}
