"use client";

import { checkoutSessionRedirection } from "@/modules/payment/helpers/checkout-session-redirection";

export const CheckoutButton = () => {
  return <button onClick={checkoutSessionRedirection}>Checkout</button>;
};
