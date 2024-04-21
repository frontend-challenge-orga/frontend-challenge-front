import { NextResponse } from "next/server";
import paymentService from "@/backend/services/payment.service";

export const POST = async () => {
  try {
    const checkoutSession = await paymentService.createCheckoutSession();

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);

    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
};
