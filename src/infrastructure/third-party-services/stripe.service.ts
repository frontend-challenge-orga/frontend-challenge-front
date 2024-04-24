import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import type Stripe from "stripe";

export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  subscriptionDuration: string,
) {
  try {
    const checkoutSession: Stripe.Response<Stripe.Checkout.Session> =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1P84uXP0a9h6Ik6fLb5TWUfG",
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata: {
            userID: userId,
            customer_email: userEmail,
            subscription_duration: subscriptionDuration,
          },
        },

        mode: "subscription",
        customer_email: userEmail,
        success_url: env.STRIPE_SUCCESS_URL,
        cancel_url: env.STRIPE_CANCEL_URL,
      });

    return checkoutSession;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const cancelledSubscription: Stripe.Response<Stripe.Subscription> =
      await stripe.subscriptions.cancel(subscriptionId);

    return cancelledSubscription;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function suspendSubscription(subscriptionId: string) {
  try {
    const suspendedSubscription: Stripe.Response<Stripe.Subscription> =
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

    return suspendedSubscription;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function retrieveSubscription(
  subscriptionId: Stripe.Subscription["id"],
) {
  try {
    const subscription: Stripe.Response<Stripe.Subscription> =
      await stripe.subscriptions.retrieve(subscriptionId);

    return subscription;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
