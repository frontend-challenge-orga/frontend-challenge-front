import { headers } from "next/headers";
import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import { NextResponse } from "next/server";
import paymentService from "@/backend/services/payment.service";

const secret = env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req: Request) => {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      throw new Error("Stripe signature is missing");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (!session.payment_intent) {
        throw new Error("Payment intent is missing");
      }

      const payload = await paymentService.getPaymentIntent(
        session.payment_intent as string,
      );
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
  }
};
