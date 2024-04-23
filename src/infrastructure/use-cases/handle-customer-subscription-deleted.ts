import type Stripe from "stripe";
import { retrieveSubscription } from "@/infrastructure/third-party-services/stripe.service";
import subscriptionRepository from "@/infrastructure/data-access/subscription";

export async function handleCustomerSubscriptionDeleted(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription) {
    throw new Error("Missing required session data");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );
  await subscriptionRepository.cancelSubscription(
    subscription.metadata.userID!,
  );
}
