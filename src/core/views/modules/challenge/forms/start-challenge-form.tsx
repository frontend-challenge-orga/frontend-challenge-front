"use client";

import { useState, useTransition } from "react";
import { Typography } from "@/core/views/components/typography";
import { startChallengeAction } from "@/core/views/actions/challenge/start-challenge";
import { StartChallengeButton } from "@/core/views//modules/challenge/components/start-challenge-button";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { Session } from "next-auth";
import { SessionGuard } from "@/core/views/modules/auth/components/session-guard";

type Props = {
  challenge: ChallengeDTO;
  session: Session;
  userHasStartedChallenge: boolean;
};

export const StartChallengeForm = ({ challenge, session, userHasStartedChallenge }: Props) => {
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
      <SessionGuard session={session}>
        <StartChallengeButton
          session={session}
          challenge={challenge}
          isPending={isPending}
          userHasStartedChallenge={userHasStartedChallenge}
        />
      </SessionGuard>
      {errorMessage && <Typography.Error>{errorMessage}</Typography.Error>}
    </form>
  );
};
