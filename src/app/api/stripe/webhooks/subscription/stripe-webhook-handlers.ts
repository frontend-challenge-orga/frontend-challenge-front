import { retrieveSubscription } from "@/third-party-services/stripe.service";
import {
  cancelSubscription,
  createSubscription,
  updateSubscription,
} from "@/data-access/subscription";
import { addMonthlyCredit } from "@/data-access/credit";
import type Stripe from "stripe";

export const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  if (!session.subscription || !session.metadata?.userID) {
    throw new Error("Missing required session data");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );

  await createSubscription(session.metadata.userID, subscription.id);
  await addMonthlyCredit(session.metadata.userID);
};

export const handleInvoicePaymentSucceeded = async (
  session: Stripe.Checkout.Session,
) => {
  if (!session.subscription || !session.metadata?.userID) {
    throw new Error("Missing required session data");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );
  /*await subscriptionService.updateSubscription(session.metadata.userID);*/
  await updateSubscription(session.metadata.userID);
  await addMonthlyCredit(subscription.metadata.userID!);
};

export const handleCustomerSubscriptionDeleted = async (
  session: Stripe.Checkout.Session,
) => {
  if (!session.subscription) {
    throw new Error("Missing required session data");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );
  await cancelSubscription(subscription.metadata.userID!);
};
