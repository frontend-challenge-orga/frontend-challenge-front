"use client";

import { useState, useTransition } from "react";
import { Typography } from "@/core/views/components/typography";
import { startChallengeAction } from "@/core/views/actions/challenge/start-challenge";
import { StartChallengeButton } from "@/core/views//modules/challenge/components/start-challenge-button";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { Session } from "next-auth";

type Props = {
  challenge: ChallengeDTO;
  session: Session;
  userHasStartedChallenge: boolean;
};

export const StartChallengeForm = ({
  challenge,
  session,
  userHasStartedChallenge,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      const payload = await startChallengeAction({
        challengeId: challenge.id,
        premium: challenge.premium,
      });

      if (payload.serverError) {
        setErrorMessage(payload.serverError);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <StartChallengeButton
        session={session}
        challenge={challenge}
        isPending={isPending}
        userHasStartedChallenge={userHasStartedChallenge}
      />
      {errorMessage && <Typography.Error>{errorMessage}</Typography.Error>}
    </form>
  );
};
