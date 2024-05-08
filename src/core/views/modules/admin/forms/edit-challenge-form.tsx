"use client";
import { useState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useCheckboxState } from "@/core/views/modules/admin/stores/useCheckboxState";
import { formSchema } from "./create-challenge-schema";
import { Form } from "@/core/views/components/ui/form";
import { InputForm } from "@/core/views/components/ui/input-form";
import { CheckboxForm } from "@/core/views/components/ui/checkbox-form";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { updateChallengeAction } from "@/core/views/actions/admin/update-challenge";
import { TextAreaForm } from "@/core/views/components/ui/textarea-form";
import { SelectForm } from "@/core/views/components/ui/select-form";
import { FieldArrayForm } from "@/core/views/components/ui/field-array-form";
import { ChallengePreview } from "@/core/views/modules/admin/components/challenge-preview";
import { ACTION_ERROR, DIFFICULTY, LANGUAGE } from "@/config/constants";
import { SwitchForm } from "@/core/views/components/ui/switch-form";
import { Typography } from "@/core/views/components/typography";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type * as z from "zod";

type FormValues = z.infer<typeof formSchema>;

type Props = {
  challenge: ChallengeDTO;
};

//

export const EditChallengeForm = ({ challenge }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Même résultat mais logique différente :
  // Création d'un store qui permet de modifier le state de previewOpen sans utiliser de props
  const { previewOpen } = useCheckboxState();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: challenge?.name,
      description: challenge?.description,
      language: challenge?.language,
      difficulty: challenge?.difficulty,
      brief: challenge?.brief,
      tips: challenge?.tips,
      assets_presentation: [{ value: "https://test.com" }],
      premium: challenge?.premium,
      starter_code_path_file: challenge?.starter_code_path_file,
      starter_figma_path_file: challenge?.starter_figma_path_file,
      preview_check: true,
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "assets_presentation",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      if (!previewOpen) {
        setErrorMessage(ACTION_ERROR.PREVIEW_CHECK);
        return;
      }
      const payload = await updateChallengeAction({ id: challenge?.id, ...values });

      if (payload.serverError) {
        setErrorMessage(payload.serverError);
      }
    });
  }

  const currentValues = form.getValues();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 p-12">
        {/* Name */}
        <InputForm control={form.control} name="name" label="Project name" />
        {/* Description */}
        <TextAreaForm control={form.control} name="description" label="Description" />
        {/* Language */}
        <SelectForm
          control={form.control}
          name="language"
          label="Language"
          items={LANGUAGE}
          placeholder="Select a language"
        />
        {/* Difficulty */}
        <SelectForm
          control={form.control}
          name="difficulty"
          label="Difficulty"
          items={DIFFICULTY}
          placeholder="Select a difficulty"
        />
        {/* Brief */}
        <TextAreaForm control={form.control} name="brief" label="Brief" />
        {/* Tips */}
        <TextAreaForm control={form.control} name="tips" label="Tips" />
        {/* Assets presentation */}
        <FieldArrayForm<FormValues>
          control={form.control}
          fields={fields}
          remove={remove}
          append={append}
          createNewItem={() => ({ value: "" })}
          name="assets_presentation"
          label={"Assets presentation"}
        />
        {/* Premium */}
        <SwitchForm control={form.control} name="premium" label="Premium" />
        {/* Starter code PATH FILE */}
        <InputForm control={form.control} name="starter_code_path_file" label="Starter code PATH FILE" />
        {/* Starter figma PATH FILE */}
        <InputForm control={form.control} name="starter_figma_path_file" label="Starter figma PATH FILE" />

        <CheckboxForm control={form.control} name="preview_check" label="Check preview before submit" />
        <div className="mt-4 flex ">
          <ButtonSubmit isPending={isPending}>Edit Challenge</ButtonSubmit>

          <ChallengePreview currentValues={currentValues} />
        </div>
        <Typography.Error>{errorMessage}</Typography.Error>
      </form>
    </Form>
  );
};
