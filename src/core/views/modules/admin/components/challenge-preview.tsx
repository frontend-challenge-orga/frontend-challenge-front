"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/core/views/components/ui/dialog";
import { Button } from "@/core/views/components/ui/button";
import { ChallengeCardPreview } from "@/core/views/modules/admin/components/challenge-card-preview";
import { ChallengeCardDownload } from "./challenge-card-download";
import type { FormValues } from "@/core/views/modules/admin/forms/create-challenge-form";
import { useCheckboxState } from "@/core/views/modules/admin/stores/useCheckboxState";

type Props = {
  currentValues: FormValues;
};

export const ChallengePreview = ({ currentValues }: Props) => {
  // L'état du store previewOpen passe à true au click sur preview
  const { open } = useCheckboxState();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => open()} className="mx-12">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="data-[state=open]:animate-contentShow rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <ChallengeCardPreview currentValues={currentValues} />
        <ChallengeCardDownload currentValues={currentValues} />
      </DialogContent>
    </Dialog>
  );
};
