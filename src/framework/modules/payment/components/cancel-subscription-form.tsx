"use client";

import React, { useTransition } from "react";
import { ButtonSubmit } from "@/components/ui/button-submit";
import { cancelSubscriptionAction } from "@/framework/actions/payment/cancel-subscription";

export const CancelSubscriptionForm = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await cancelSubscriptionAction({ subscriptionId: "sub_12345" });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ButtonSubmit type="submit" isPending={isPending}>
        Cancel subscription
      </ButtonSubmit>
    </form>
  );
};
