import type Stripe from "stripe";
import { retrieveSubscription } from "@/third-party-services/stripe.service";
import { cancelSubscription } from "@/data-access/subscription";

export async function handleCustomerSubscriptionDeleted(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription) {
    throw new Error("Missing required session data");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );
  await cancelSubscription(subscription.metadata.userID!);
}
