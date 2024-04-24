import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import type Stripe from "stripe";

import { handleUpdatedSubscriptionWebhook } from "@/infrastructure/use-cases/subscription/handle-updated-subscription-webhook";
import { handleAbortedSubscriptionWebhook } from "@/infrastructure/use-cases/subscription/handle-aborted-subscription-webhook";
import { handleUpcomingInvoiceWebhook } from "@/infrastructure/use-cases/subscription/handle-upcoming-invoice-webhook";
import { handleCreatedInvoiceWebhook } from "@/infrastructure/use-cases/subscription/handle-created-invoice-webhook";

const secret = env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req: Request) => {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.data.object.object === "subscription") {
      const subscription = event.data.object as Stripe.Subscription;

      switch (event.type) {
        case "customer.subscription.updated":
          await handleUpdatedSubscriptionWebhook(subscription);
          break;
        case "subscription_schedule.aborted":
          await handleAbortedSubscriptionWebhook(subscription);
          break;
      }
    }

    if (event.data.object.object === "invoice") {
      const invoice = event.data.object as Stripe.Invoice;

      switch (event.type) {
        case "invoice.updated":
          await handleCreatedInvoiceWebhook(invoice);
          break;

        case "invoice.upcoming":
          await handleUpcomingInvoiceWebhook(invoice);
          break;
      }
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message, ok: false });
    }
  }
};
