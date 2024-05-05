import { ChallengesContainer } from "@/core/views/modules/challenge/components/challenge-card/challenges-container";
import { ChallengesGrid } from "@/core/views/modules/challenge/components/challenges-grid";
import { ChallengeCard } from "@/core/views/modules/challenge/components/challenge-card";

import type { Session } from "next-auth";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";

type Props = {
  getServerAuthSession: () => Promise<Session | null>;
  challengesServiceHandler: () => Promise<{
    challenges: ChallengeDTO[];
    getCompletedChallenges: (userId: string) => Promise<ChallengeSolutionDTO[]>;
  }>;
};

export async function ChallengesPageContainer({ challengesServiceHandler, getServerAuthSession }: Props) {
  const session = await getServerAuthSession();
  const { challenges, getCompletedChallenges } = await challengesServiceHandler();
  const completedChallenges = session ? await getCompletedChallenges(session.user.id) : [];

  return (
    <ChallengesContainer>
      <ChallengesGrid>
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            completedChallenges={completedChallenges}
            session={session}
          />
        ))}
      </ChallengesGrid>
    </ChallengesContainer>
  );
}
