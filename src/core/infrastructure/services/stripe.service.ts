import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import type { SubscriptionDurationType } from "@/config/types";
import type Stripe from "stripe";

interface IStripeService {
  createCheckoutSession: (
    userId: string,
    userEmail: string,
    subscriptionDuration: SubscriptionDurationType,
  ) => Promise<Stripe.Response<Stripe.Checkout.Session>>;

  suspendSubscription: (
    userId: string,
  ) => Promise<Stripe.Response<Stripe.Subscription>>;

  getStripePriceIdBySubscriptionDuration: (
    subscriptionDuration: SubscriptionDurationType,
  ) => string;
}

export const stripeService: IStripeService = {
  async createCheckoutSession(
    userId: string,
    userEmail: string,
    subscriptionDuration: SubscriptionDurationType,
  ) {
    return await stripe.checkout.sessions.create({
      line_items: [
        {
          price:
            this.getStripePriceIdBySubscriptionDuration(subscriptionDuration),
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
  },

  async suspendSubscription(userId: string) {
    try {
      const subscription =
        await subscriptionService.getSubscriptionByUserId(userId);

      return await stripe.subscriptions.update(subscription.subscription_id, {
        cancel_at_period_end: true,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getStripePriceIdBySubscriptionDuration(
    subscriptionDuration: SubscriptionDurationType,
  ) {
    return subscriptionDuration === "MONTHLY"
      ? env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
      : env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID;
  },
};
