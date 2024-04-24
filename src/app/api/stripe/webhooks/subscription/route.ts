import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import type Stripe from "stripe";

import { handleCheckoutSessionCompletedWebHook } from "@/infrastructure/use-cases/handle-checkout-session-completed";
import { handleInvoicePaymentSucceededWebhook } from "@/infrastructure/use-cases/handle-invoice-payment-suceeded";

const secret = env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req: Request) => {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompletedWebHook(session);
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceededWebhook(session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, ok: false });
    }
  }
};
