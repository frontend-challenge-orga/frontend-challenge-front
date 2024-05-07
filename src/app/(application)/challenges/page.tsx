import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";
import { getServerAuthSession } from "@/config/server/auth";
import { challengesServiceHandler } from "@/core/views/page-handler/challenges-service-handler";
/*import { parseAsString } from "nuqs";*/

/*import type { Filter } from "@/core/domain/entities/challenge.entity";*/

type PageProps = {
  searchParams?: {
    type?: string;
    difficulty?: string;
    language?: string;
  };
};

export type Filter = {
  type?: string[];
  difficulty?: string[];
  language?: string[];
};

export default async function ChallengesPage({ searchParams }: PageProps) {
  function parseTypeParam(typeParam: string): string[] {
    const withoutNumbers = typeParam.replace(/\d/g, "");
    return withoutNumbers.split("&");
  }

  function parseUrlParams(searchParams: PageProps["searchParams"]): Filter {
    const filter: Filter = {};

    if (searchParams?.type) {
      filter.type = parseTypeParam(searchParams.type);
    }

    if (searchParams?.difficulty) {
      filter.difficulty = parseTypeParam(searchParams.difficulty);
    }

    if (searchParams?.language) {
      filter.language = parseTypeParam(searchParams.language);
    }

    return filter;
  }

  console.log(parseUrlParams(searchParams));

  return (
    <ChallengesPageContainer
      getServerAuthSession={getServerAuthSession}
      challengesServiceHandler={challengesServiceHandler}
    />
  );
}
