"use client";
import { useState, useTransition } from "react";
import { useChallengePage } from "@/core/views/modules/challenge/context/challenge-page-context";
import { Typography } from "@/core/views/components/typography";
import { startChallengeAction } from "@/core/views/actions/challenge/start-challenge";
import { StartChallengeButton } from "@/core/views//modules/challenge/components/start-challenge-button";

export const StartChallengeForm = () => {
  const { challenge } = useChallengePage();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      const payload = await startChallengeAction({
        challengeId: challenge.id,
      });

      if (payload.serverError) {
        setErrorMessage(payload.serverError);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <StartChallengeButton isPending={isPending} isPremiumChallenge={challenge.premium} />
      {errorMessage && <Typography.Error>{errorMessage}</Typography.Error>}
    </form>
  );
};
