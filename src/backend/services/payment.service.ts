import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import type Stripe from "stripe";

class PaymentService {
  async createCheckoutSession(userId: string) {
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
            },
          },

          mode: "subscription",
          success_url: env.STRIPE_SUCCESS_URL,
          cancel_url: env.STRIPE_CANCEL_URL,
        });

      return checkoutSession;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      const cancelledSubscription: Stripe.Response<Stripe.Subscription> =
        await stripe.subscriptions.cancel(subscriptionId);

      return cancelledSubscription;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const paymentService = new PaymentService();
export default paymentService;
