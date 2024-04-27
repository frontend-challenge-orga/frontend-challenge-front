"use client";
import React, { useTransition } from "react";
import type { Challenge } from "@prisma/client";
import type { Session } from "next-auth";

import { startChallengeAction } from "@/core/views/actions/challenge/start-challenge";
import { StartChallengeButton } from "@/core/views//modules/challenge/components/start-challenge-button";

type Props = {
  challenge: Challenge;
  session: Session;
  userHasStartedChallenge: boolean;
};

export const StartChallengeForm = ({
  challenge,
  session,
  userHasStartedChallenge,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const payload = await startChallengeAction({
        challengeId: challenge.id,
        premium: challenge.premium,
      });

      if (payload.serverError) {
        alert("Error starting challenge");
        return;
      }

      alert("Challenge started");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StartChallengeButton
        session={session}
        challenge={challenge}
        isPending={isPending}
        userHasStartedChallenge={userHasStartedChallenge}
      />
    </form>
  );
};
