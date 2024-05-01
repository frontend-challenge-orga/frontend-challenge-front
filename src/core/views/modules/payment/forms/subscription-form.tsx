"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/core/views/components/ui/form";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { SubscriptionDurationSwitch } from "@/core/views/modules/payment/components/subscription-duration-switch";
import { createCheckoutSessionAction } from "@/core/views/actions/payment/create-checkout-session";
import { Typography } from "@/core/views/components/typography";
import { formSchema } from "@/core/views/modules/payment/forms/subscription-schema";
import type * as z from "zod";

type FormValues = z.infer<typeof formSchema>;

export const SubscriptionForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const subscriptionDuration = values.subscription_duration
        ? "YEARLY"
        : "MONTHLY";

      const payload = await createCheckoutSessionAction({
        subscription_duration: subscriptionDuration,
      });

      if (payload.serverError) {
        setErrorMessage(payload.serverError);
        return;
      }

      window.location.href = payload.data!;
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SubscriptionDurationSwitch control={form.control} />
        <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>
        <Typography.Error>{errorMessage}</Typography.Error>
      </form>
    </Form>
  );
};
