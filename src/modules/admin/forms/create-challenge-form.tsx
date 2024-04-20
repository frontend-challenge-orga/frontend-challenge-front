"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { formSchema } from "./create-challenge-schema";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { createChallengeAction } from "@/backend/actions/create-challenge";
import { TextAreaForm } from "@/components/ui/textarea-form";
import { SelectForm } from "@/components/ui/select-form";
import { FieldArrayForm } from "@/components/ui/field-array-form";
import { DIFFICULTY, LANGUAGE } from "@/config/constants";
import { SwitchForm } from "@/components/ui/switch-form";
import * as z from "zod";

type FormValues = z.infer<typeof formSchema>;

export const CreateChallengeForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "test",
      description: "test",
      language: "HTML_CSS",
      difficulty: "NEWBIE",
      brief: "test",
      tips: "test",
      assets_presentation: [{ value: "https://test.com" }],
      premium: false,
      starter_code_url: "https://test.com",
      starter_figma_url: "https://test.com",
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "assets_presentation",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      console.log(values);
      // await createChallengeAction(values);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 p-12">
        <InputForm control={form.control} name="name" label="Project name" />
        <TextAreaForm
          control={form.control}
          name="description"
          label="Description"
        />
        <SelectForm
          control={form.control}
          name="language"
          label="Language"
          items={LANGUAGE}
          placeholder="Select a language"
        />
        <SelectForm
          control={form.control}
          name="difficulty"
          label="Difficulty"
          items={DIFFICULTY}
          placeholder="Select a difficulty"
        />
        <TextAreaForm control={form.control} name="brief" label="Brief" />
        <TextAreaForm control={form.control} name="tips" label="Tips" />

        <FieldArrayForm<FormValues>
          control={form.control}
          fields={fields}
          remove={remove}
          append={append}
          createNewItem={() => ({ value: "" })}
          name="assets_presentation"
        />

        <SwitchForm control={form.control} name="premium" label="Premium" />
        <InputForm
          control={form.control}
          name="starter_code_url"
          label="Starter code URL"
        />
        <InputForm
          control={form.control}
          name="starter_figma_url"
          label="Starter figma URL"
        />

        <SubmitButton isPending={isPending}>Create Challenge</SubmitButton>
      </form>
    </Form>
  );
};
