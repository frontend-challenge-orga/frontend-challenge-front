import { ChallengesContainer } from "@/core/views/modules/challenge/components/challenge-card/challenges-container";
import { ChallengesGrid } from "@/core/views/modules/challenge/components/challenges-grid";
import { ChallengeCard } from "@/core/views/modules/challenge/components/challenge-card";

import type { Session } from "next-auth";
import { type ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  getChallenges: () => Promise<ChallengeDTO[]>;
  getServerAuthSession: () => Promise<Session | null>;
};

export async function ChallengesPageContainer({ getChallenges, getServerAuthSession }: Props) {
  const session = await getServerAuthSession();
  const challenges = await getChallenges();
  const testChallenges: ChallengeDTO[] = new Array(10).fill(challenges[0]);

  return (
    <ChallengesContainer>
      <ChallengesGrid>
        {testChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} session={session} />
        ))}
      </ChallengesGrid>
    </ChallengesContainer>
  );
}
