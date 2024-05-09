"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/core/views/components/ui/dialog";
import { Button } from "@/core/views/components/ui/button";
import { ChallengeCardPreview } from "@/core/views/modules/admin/components/challenge-card-preview";
import { ChallengeCardDownload } from "./challenge-card-download";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { useCheckboxState } from "@/core/views/modules/admin/stores/useCheckboxState";
import type { FormValues } from "@/core/views/modules/admin/forms/create-challenge-form";

type Props = {
  currentValues: FormValues;
  form: "create-challenge-form" | "edit-challenge-form";
  type: "create" | "edit";
  isPending: boolean;
};

export const ChallengePreview = ({ currentValues, form, type, isPending }: Props) => {
  const { open } = useCheckboxState();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={open} className="mx-12">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="data-[state=open]:animate-contentShow rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <ChallengeCardPreview currentValues={currentValues} />
        <ChallengeCardDownload currentValues={currentValues} />
        <ButtonSubmit isPending={isPending} form={form}>
          {type === "create" ? "Create Challenge" : "Update Challenge"}
        </ButtonSubmit>
      </DialogContent>
    </Dialog>
  );
};
