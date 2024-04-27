"use client";

import * as React from "react";
import { Button } from "@/core/views/components/ui/button";
import { sendSubscriptionConfirmationAction } from "@/core/views/actions/payment/send-subscription-email";

export const SendEmailButton = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendSubscriptionConfirmationAction({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Send Email</Button>
    </form>
  );
};
