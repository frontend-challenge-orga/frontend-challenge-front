"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/core/views/components/ui/form";

import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { InputForm } from "@/core/views/components/ui/input-form";
import { SelectForm } from "@/core/views/components/ui/select-form";
import { TextAreaForm } from "@/core/views/components/ui/textarea-form";
import { createChallengeAction } from "@/core/views/actions/challenge/create-challenge";
import { formSchema } from "@/core/views/modules/challenge/forms/challenge-solution-schema";
import * as z from "zod";
import { createChallengeSolutionAction } from "@/core/views/actions/challenge/create-challenge-solution";
import { Challenge } from "@prisma/client";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type FormValues = z.infer<typeof formSchema>;

type Props = {
  challenge: ChallengeDTO;
};

export const ChallengeSolutionForm = ({ challenge }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "azfazfazf",
      repository_url: "https://www.twitch.tv/moderator/swiichy_",
      live_preview_url: "https://www.twitch.tv/moderator/swiichy_",
      stacks: "Nextjs",
      solution_retrospective: "zekjbfkzjebfkjzebfkjzb",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await createChallengeSolutionAction({
        ...values,
        challengeId: challenge.id,
      });
    });
  }

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
        <SelectForm
          control={form.control}
          name="stacks"
          placeholder="Select..."
          items={["Nextjs", "Tailwind"]}
          label="Stacks"
        />

        {/* Solution Retrospective */}
        <TextAreaForm
          control={form.control}
          name="solution_retrospective"
          label="Solution Retrospective"
        />

        <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>
      </form>
    </Form>
  );
};
