"use client";
import React, { useState, useTransition } from "react";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { Typography } from "@/core/views/components/typography";
import { removeChallengeAction } from "@/core/views/actions/admin/remove-challenge";

type Props = {
  challengeId: string;
};

export const RemoveChallengeForm = ({ challengeId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(challengeId: string) {
    startTransition(async () => {
      const response = await removeChallengeAction({ challengeId });

      if (response.serverError) {
        setErrorMessage(response.serverError);
      }
    });
  }

  return (
    <form action={() => handleSubmit(challengeId)} className="flex items-end">
      <ButtonSubmit isPending={isPending} variant={"destructive"}>
        Remove
      </ButtonSubmit>
      <Typography.Error>{errorMessage}</Typography.Error>
    </form>
  );
};
