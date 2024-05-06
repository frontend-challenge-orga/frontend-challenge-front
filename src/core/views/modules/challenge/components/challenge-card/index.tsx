import { ChallengeCardHeader } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-header";
import { ChallengeCardName } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-name";
import { ChallengeCardLanguage } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-language";
import { ChallengeCardDescription } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-description";
import { ChallengeCardDifficulty } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-difficulty";
import { ChallengeCardLayout } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-layout";

import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";
import type { Session } from "next-auth";

type Props = {
  challenge: ChallengeDTO;
  completedChallenges: ChallengeSolutionDTO[];
  session: Session | null;
};

export const ChallengeCard = async ({ challenge, completedChallenges, session }: Props) => {
  const { id, slug, name, description, difficulty, premium } = challenge;

  const isCompletedChallenge = completedChallenges.some((completedChallenge) => completedChallenge.challengeId === id);

  return (
    <ChallengeCardLayout>
      <ChallengeCardHeader
        slug={slug}
        premium={premium}
        session={session}
        isCompletedChallenge={isCompletedChallenge}
      />

      <div className={"p-6"}>
        <ChallengeCardName slug={slug} name={name} />
        <div className={"flex justify-between items-center gap-2 mt-4 flex-wrap"}>
          <ChallengeCardLanguage />
          <ChallengeCardDifficulty difficulty={difficulty} />
        </div>

        <ChallengeCardDescription description={description} />
      </div>
    </ChallengeCardLayout>
  );
};
