import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";
import { getServerAuthSession } from "@/config/server/auth";
import { challengesServiceHandler } from "@/core/views/page-handler/challenges-service-handler";
import { parseAsString } from "nuqs";

type PageProps = {
  searchParams?: {
    type?: string;
    difficulty?: string[];
    language?: string[];
  };
};

export default async function ChallengesPage({ searchParams }: PageProps) {
  function parseTypeParam(typeParam: string | undefined) {
    return console.log(typeParam);
  }

  return (
    <ChallengesPageContainer
      getServerAuthSession={getServerAuthSession}
      challengesServiceHandler={challengesServiceHandler}
    />
  );
}
