"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/core/views/components/ui/form";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { InputForm } from "@/core/views/components/ui/input-form";
import { MultiSelectForm } from "@/core/views/components/ui/multi-select-form";
import { TextAreaForm } from "@/core/views/components/ui/textarea-form";
import { formSchema } from "@/core/views/modules/challenge/forms/challenge-solution-schema";
import { createChallengeSolutionAction } from "@/core/views/actions/challenge/create-challenge-solution";
import { Typography } from "@/core/views/components/typography";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type * as z from "zod";

type FormValues = z.infer<typeof formSchema>;

type Props = {
  challenge: ChallengeDTO;
};

export const ChallengeSolutionForm = ({ challenge }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "azfazfazf",
      repository_url: "https://www.twitch.tv/moderator/swiichy_",
      live_preview_url: "https://www.twitch.tv/moderator/swiichy_",
      stacks: [],
      solution_retrospective: "zekjbfkzjebfkjzebfkjzb",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { serverError } = await createChallengeSolutionAction({
        ...values,
        challengeId: challenge.id,
      });

      serverError ? setErrorMessage(serverError) : setSuccessMessage("Success");
    });
  }

  // Get from database
  const stacks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
    {
      value: "wordpress",
      label: "WordPress",
    },
    {
      value: "express.js",
      label: "Express.js",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 p-12">
        {/* Title */}
        <InputForm control={form.control} name="title" label="Solution title" />

        {/* Repository URL */}
        <InputForm
          control={form.control}
          name="repository_url"
          label="Repository URL"
        />

        {/* Live Preview URL */}
        <InputForm
          control={form.control}
          name="live_preview_url"
          label="Live Preview URL"
        />

        {/* Stacks */}
        <MultiSelectForm
          control={form.control}
          name="stacks"
          options={stacks}
          label="Stacks"
        />

        {/* Solution Retrospective */}
        <TextAreaForm
          control={form.control}
          name="solution_retrospective"
          label="Solution Retrospective"
        />

        <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>
        <Typography.Error>{errorMessage}</Typography.Error>
        <Typography.Success>{successMessage}</Typography.Success>
      </form>
    </Form>
  );
};
