import { Fragment } from "react";
import { ChallengesGrid } from "@/core/views/modules/challenge/components/challenges-grid";
import { ChallengeCard } from "@/core/views/modules/challenge/components/challenge-card";
import { ChallengeFilter } from "@/core/views/modules/challenge/components/challenge-filter";
import { ChallengeFilterer } from "@/core/infrastructure/use-cases/challenge-filter";

import type { Session } from "next-auth";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";
import type { ChallengePageSearchParamsType } from "@/config/types";

type Props = {
  getServerAuthSession: () => Promise<Session | null>;
  challengesServiceHandler: () => Promise<{
    challenges: ChallengeDTO[];
    getCompletedChallenges: (userId: string) => Promise<ChallengeSolutionDTO[]>;
  }>;
  searchParams?: ChallengePageSearchParamsType["searchParams"];
};

export async function ChallengesPageContainer({ challengesServiceHandler, getServerAuthSession, searchParams }: Props) {
  const session = await getServerAuthSession();
  const { challenges, getCompletedChallenges } = await challengesServiceHandler();
  const completedChallenges = session ? await getCompletedChallenges(session.user.id) : [];

  const filteredChallengesResult = await new ChallengeFilterer().do({
    challenges,
    searchParams: searchParams ?? {},
  });

  return (
    <Fragment>
      <ChallengeFilter />
      <ChallengesGrid>
        {filteredChallengesResult.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            completedChallenges={completedChallenges}
            session={session}
            type={"challenge"}
          />
        ))}
      </ChallengesGrid>
    </Fragment>
  );
}
