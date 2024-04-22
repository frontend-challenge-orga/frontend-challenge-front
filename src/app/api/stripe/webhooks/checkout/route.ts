import { headers } from "next/headers";
import { stripe } from "@/config/libs/stripe";
import { env } from "@/config/env";
import { NextResponse } from "next/server";
import userService from "@/backend/services/user.service";

const secret = env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req: Request) => {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      throw new Error("Stripe signature is missing");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "customer.subscription.created") {
      const subscription = event.data.object;

      if (!subscription.metadata.userID) {
        throw new Error("User ID is missing");
      }

      await userService.createSubscription(subscription.metadata.userID);
    }
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object;

      if (!subscription.metadata.userID) {
        throw new Error("User ID is missing");
      }

      await userService.createSubscription(subscription.metadata.userID);
    }
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;

      if (!subscription.metadata.userID) {
        throw new Error("User ID is missing");
      }

      await userService.cancelSubscription(subscription.metadata.userID);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
  }
};
