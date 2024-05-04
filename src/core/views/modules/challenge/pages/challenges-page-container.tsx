import { ChallengesContainer } from "@/core/views/modules/challenge/components/challenge-card/challenges-container";
import { ChallengesGrid } from "@/core/views/modules/challenge/components/challenges-grid";
import { ChallengeCard } from "@/core/views/modules/challenge/components/challenge-card";

import type { Session } from "next-auth";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";

type Props = {
  getChallenges: () => Promise<ChallengeDTO[]>;
  getServerAuthSession: () => Promise<Session | null>;
  getCompletedChallenges: (userId: string) => Promise<ChallengeSolutionDTO[]>;
};

export async function ChallengesPageContainer({ getChallenges, getServerAuthSession, getCompletedChallenges }: Props) {
  const session = await getServerAuthSession();
  const challenges = await getChallenges();
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
