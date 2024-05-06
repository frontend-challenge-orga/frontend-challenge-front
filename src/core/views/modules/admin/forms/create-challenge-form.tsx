"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/core/views/components/ui/form";
import { InputForm } from "@/core/views/components/ui/input-form";
import { CheckboxForm } from "@/core/views/components/ui/checkbox-form";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { TextAreaForm } from "@/core/views/components/ui/textarea-form";
import { SelectForm } from "@/core/views/components/ui/select-form";
import { FieldArrayForm } from "@/core/views/components/ui/field-array-form";
import { ChallengePreview } from "@/core/views/modules/admin/components/challenge-preview";
import { SwitchForm } from "@/core/views/components/ui/switch-form";
import { Typography } from "@/core/views/components/typography";
import { ACTION_ERROR, DIFFICULTY, LANGUAGE } from "@/config/constants";
import { formSchema } from "./create-challenge-schema";
import { createChallengeAction } from "@/core/views/actions/admin/create-challenge";

import type * as z from "zod";

export type FormValues = z.infer<typeof formSchema>;

export const CreateChallengeForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      starter_code_path_file: "/starter-code/LOLACCOUNT.txt",
      starter_figma_path_file: "/starter-code/LOLACCOUNT.txt",
      preview_check: false,
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "assets_presentation",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      if (!values.preview_check) {
        setErrorMessage(ACTION_ERROR.PREVIEW_CHECK);
        return;
      }
      const payload = await createChallengeAction(values);

      if (payload.serverError) {
        setErrorMessage(payload.serverError);
      }
    });
  }

  const currentValues = form.getValues();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 p-12">
        <InputForm control={form.control} name="name" label="Project name" />

        <TextAreaForm control={form.control} name="description" label="Description" />

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
          label={"Assets presentation"}
        />

        <SwitchForm control={form.control} name="premium" label="Premium" />

        <InputForm control={form.control} name="starter_code_path_file" label="Starter code PATH FILE" />

        <InputForm control={form.control} name="starter_figma_path_file" label="Starter figma PATH FILE" />

        <CheckboxForm control={form.control} name="preview_check" label="checkbox" />

        <div className="mt-4 flex ">
          <ButtonSubmit isPending={isPending}>Create Challenge</ButtonSubmit>
          <ChallengePreview currentValues={currentValues} />
        </div>
        <Typography.Error>{errorMessage}</Typography.Error>
      </form>
    </Form>
  );
};
