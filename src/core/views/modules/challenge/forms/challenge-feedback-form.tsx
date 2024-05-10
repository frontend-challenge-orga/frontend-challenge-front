"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/core/views/components/ui/form";
import { TextAreaForm } from "@/core/views/components/ui/textarea-form";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { submitFeedbackAction } from "@/core/views/actions/challenge/submit-feedback";
import { formSchema } from "@/core/views/modules/challenge/forms/challenge-feedback-schema";
import { Typography } from "@/core/views/components/typography";
import type * as z from "zod";

type FormValues = z.infer<typeof formSchema>;

type Props = {
  solutionId: string;
  slug: string;
};

export const ChallengeFeedbackForm = ({ solutionId, slug }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { serverError } = await submitFeedbackAction({
        ...values,
        solutionId,
        slug,
      });

      serverError ? setErrorMessage(serverError) : setSuccessMessage("Success");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 p-12">
        <TextAreaForm control={form.control} name="comment" />

        <ButtonSubmit isPending={isPending} className="mt-4">
          Post feedback
        </ButtonSubmit>
        <Typography.Error>{errorMessage}</Typography.Error>
        <Typography.Success>{successMessage}</Typography.Success>
      </form>
    </Form>
  );
};
