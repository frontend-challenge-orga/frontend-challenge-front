"use client";

import React, { useTransition } from "react";
import { ButtonSubmit } from "@/components/ui/button-submit";
import handleCheckoutSession from "@/modules/payment/helpers/handle-checkout-session";

export const CheckoutSessionForm = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await handleCheckoutSession();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ButtonSubmit type="submit" isPending={isPending}>
        Checkout
      </ButtonSubmit>
    </form>
  );
};
