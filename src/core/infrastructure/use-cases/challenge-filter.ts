import { CHALLENGE_TYPE } from "@/config/constants";
import type { ChallengeFilterType, ChallengePageSearchParamsType } from "@/config/types";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type ChallengeFilterInput = {
  challenges: ChallengeDTO[];
  searchParams: ChallengePageSearchParamsType["searchParams"];
};

export class ChallengeFilterer {
  public async do({ challenges, searchParams }: ChallengeFilterInput) {
    return this.filteredChallenges(challenges, this.parseUrlParams(searchParams));
  }

  private parseTypeParam(typeParam: string): string[] {
    const withoutNumbers = typeParam.replace(/\d/g, "");
    return withoutNumbers.toUpperCase().split("&");
  }

  private parseUrlParams(searchParams: ChallengePageSearchParamsType["searchParams"]): ChallengeFilterType {
    const filter: ChallengeFilterType = {};

    if (searchParams?.type) {
      filter.type = this.parseTypeParam(searchParams.type);
    }

    if (searchParams?.difficulty) {
      filter.difficulty = this.parseTypeParam(searchParams.difficulty);
    }

    if (searchParams?.language) {
      filter.language = this.parseTypeParam(searchParams.language);
    }

    return filter;
  }

  private filteredChallenges(challenges: ChallengeDTO[], filter: ChallengeFilterType): ChallengeDTO[] {
    return challenges.filter((challenge) => {
      let matches = true;

      if (filter.type && filter.type.length > 0) {
        matches = matches && filter.type.includes(challenge.premium ? CHALLENGE_TYPE.PREMIUM : CHALLENGE_TYPE.FREE);
      }

      if (filter.difficulty && filter.difficulty.length > 0) {
        matches = matches && filter.difficulty.includes(challenge.difficulty);
      }

      if (filter.language && filter.language.length > 0) {
        matches = matches && filter.language.includes(challenge.language);
      }

      return matches;
    });
  }
}
