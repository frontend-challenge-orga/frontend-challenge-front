import { ChallengesContainer } from "@/core/views/modules/challenge/components/challenge-card/challenges-container";
import { ChallengesGrid } from "@/core/views/modules/challenge/components/challenges-grid";
import { ChallengeCard } from "@/core/views/modules/challenge/components/challenge-card";
import { ChallengeFilter } from "@/core/views/modules/challenge/components/challenge-filter";

import type { Session } from "next-auth";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";
import type { Filter } from "@/core/domain/entities/challenge.entity";

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

  function filteredChallenges(challenges: ChallengeDTO[], filter: Filter): ChallengeDTO[] {
    return challenges.filter((challenge) => {
      let matches = true;

      if (filter.type && filter.type.length > 0) {
        matches = matches && filter.type.includes(challenge.premium ? "premium" : "free");
      }

      /* if (filter.difficulty && filter.difficulty.length > 0) {
        matches = matches && filter.difficulty.includes(challenge.difficulty);
      }

      if (filter.language && filter.language.length > 0) {
        matches = matches && filter.language.includes(challenge.language);
      }*/

      return matches;
    });
  }

  const filteredChallengesResult = filteredChallenges(challenges, { type: ["free", "premium"] });

  return (
    <ChallengesContainer>
      <ChallengeFilter />
      <ChallengesGrid>
        {filteredChallengesResult.map((challenge) => (
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
