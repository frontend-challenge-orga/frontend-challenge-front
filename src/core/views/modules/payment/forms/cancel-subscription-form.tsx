"use client";

import React, { useState, useTransition } from "react";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { cancelSubscriptionAction } from "@/core/views/actions/payment/cancel-subscription";
import { Typography } from "@/core/views/components/typography";

export const CancelSubscriptionForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const payload = await cancelSubscriptionAction({});

      if (payload.serverError) {
        setErrorMessage(payload.serverError);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={"flex flex-col items-center"}>
      <ButtonSubmit type="submit" isPending={isPending}>
        Cancel subscription
      </ButtonSubmit>
      <Typography.Error>{errorMessage}</Typography.Error>
    </form>
  );
};
