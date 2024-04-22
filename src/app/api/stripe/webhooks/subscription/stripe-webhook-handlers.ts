import type Stripe from "stripe";
import stripeService from "@/backend/services/stripe.service";
import subscriptionService from "@/backend/services/subscription.service";
import creditService from "@/backend/services/credit.service";

export const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  if (!session.subscription || !session.metadata?.userID) {
    throw new Error("Missing required session data");
  }

  const subscription = await stripeService.retrieveSubscription(
    session.subscription as string,
  );
  await subscriptionService.createSubscription(
    session.metadata.userID,
    subscription.id,
  );
  await creditService.addMonthlyCredit(session.metadata.userID);
};

export const handleInvoicePaymentSucceeded = async (
  session: Stripe.Checkout.Session,
) => {
  if (!session.subscription || !session.metadata?.userID) {
    throw new Error("Missing required session data");
  }

  const subscription = await stripeService.retrieveSubscription(
    session.subscription as string,
  );
  await subscriptionService.updateSubscription(session.metadata.userID);
  await creditService.addMonthlyCredit(subscription.metadata.userID!);
};

export const handleCustomerSubscriptionDeleted = async (
  session: Stripe.Checkout.Session,
) => {
  if (!session.subscription) {
    throw new Error("Missing required session data");
  }

  const subscription = await stripeService.retrieveSubscription(
    session.subscription as string,
  );
  await subscriptionService.cancelSubscription(subscription.metadata.userID!);
};
