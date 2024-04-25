"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/infrastructure/framework/components/ui/form";
import { formSchema } from "@/infrastructure/framework/modules/payment/forms/subscription-schema";
import type * as z from "zod";

import { ButtonSubmit } from "@/infrastructure/framework/components/ui/button-submit";
import { SubscriptionDurationSwitch } from "@/infrastructure/framework/modules/payment/components/subscription-duration-switch";
import handleCheckoutSession from "@/infrastructure/framework/modules/payment/helpers/handle-checkout-session";

type FormValues = z.infer<typeof formSchema>;

export const SubscriptionForm = () => {
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

      await handleCheckoutSession(subscriptionDuration);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SubscriptionDurationSwitch control={form.control} />
        <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>
      </form>
    </Form>
  );
};
