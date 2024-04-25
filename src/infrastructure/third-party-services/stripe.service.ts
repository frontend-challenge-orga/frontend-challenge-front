import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import { getStripePriceIdBySubscriptionDuration } from "@/infrastructure/use-cases/subscription/get-stripe-price-id-by-subscription-duration";
import type { SubscriptionDurationType } from "@/config/types";
import type Stripe from "stripe";

export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  subscriptionDuration: SubscriptionDurationType,
) {
  try {
    const checkoutSession: Stripe.Response<Stripe.Checkout.Session> =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            price: getStripePriceIdBySubscriptionDuration(subscriptionDuration),
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
