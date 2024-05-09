import React from "react";
import { ChallengeCardHeader } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-header";
import { ChallengeCardName } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-name";
import { ChallengeCardLanguage } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-language";
import { ChallengeCardDescription } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-description";
import { ChallengeCardDifficulty } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-difficulty";
import { ChallengeCardLayout } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-layout";

import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";
import type { Session } from "next-auth";
import { ChallengeCardHeaderSolution } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-header-solution";

type Props = {
  challenge: ChallengeDTO;
  completedChallenges?: ChallengeSolutionDTO[];
  solutionId?: string;
  session?: Session | null;
  type: "challenge" | "solution";
  children?: React.ReactNode;
};

export const ChallengeCard = async ({ challenge, completedChallenges, solutionId, session, type, children }: Props) => {
  const { id, slug, name, description, difficulty, premium } = challenge;

  const isCompletedChallenge = completedChallenges?.some((completedChallenge) => completedChallenge.challengeId === id);

  return (
    <ChallengeCardLayout>
      {type === "challenge" && (
        <ChallengeCardHeader
          slug={slug}
          premium={premium}
          session={session}
          isCompletedChallenge={isCompletedChallenge}
        />
      )}

      {type === "solution" && <ChallengeCardHeaderSolution solutionId={solutionId} slug={slug} />}

      <div className={"p-6"}>
        <ChallengeCardName slug={slug} name={name} />
        <div className={"flex justify-between items-center gap-2 mt-4 flex-wrap"}>
          <ChallengeCardLanguage />
          <ChallengeCardDifficulty difficulty={difficulty} />
        </div>

        <ChallengeCardDescription description={description} />
      </div>

      {type === "solution" && children}
    </ChallengeCardLayout>
  );
};
