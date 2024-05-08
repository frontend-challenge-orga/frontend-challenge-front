import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";
import { getServerAuthSession } from "@/config/server/auth";
import { challengesServiceHandler } from "@/core/views/page-handler/challenges-service-handler";
import type { ChallengePageSearchParamsType } from "@/config/types";

type PageProps = {
  searchParams?: ChallengePageSearchParamsType["searchParams"];
};

export default async function ChallengesPage({ searchParams }: PageProps) {
  return (
    <ChallengesPageContainer
      getServerAuthSession={getServerAuthSession}
      challengesServiceHandler={challengesServiceHandler}
      searchParams={searchParams}
    />
  );
}
