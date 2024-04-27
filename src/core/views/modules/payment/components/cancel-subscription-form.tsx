"use client";

import React, { useTransition } from "react";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { cancelSubscriptionAction } from "@/core/views/actions/payment/cancel-subscription";

export const CancelSubscriptionForm = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await cancelSubscriptionAction({});
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
