import { CHALLENGE_TYPE } from "@/config/constants";
import type { ChallengeFilterTypeUpdate, ChallengePageSearchParamsType } from "@/config/types";
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

  public parseUrlParams(searchParams: ChallengePageSearchParamsType["searchParams"] = {}): ChallengeFilterTypeUpdate {
    // Utilisez la méthode `reduce` pour transformer `searchParams` en un objet de filtre.
    return Object.keys(searchParams).reduce((filter, key) => {
      // Pour chaque clé dans `searchParams`, obtenez la valeur correspondante.
      const value = searchParams[key];

      // Si la valeur existe, transformez-la en un tableau de chaînes de caractères
      // en utilisant la méthode `parseTypeParam`, puis ajoutez-la à l'objet de filtre.
      if (value) {
        filter[key] = this.parseTypeParam(value);
      }

      return filter;
    }, {} as ChallengeFilterTypeUpdate);
  }

  private matchesFilterType(filterType: string[] | undefined, challengeType: string): boolean {
    return filterType && filterType.length > 0 ? filterType.includes(challengeType) : true;
  }

  private filteredChallenges(challenges: ChallengeDTO[], filter: ChallengeFilterTypeUpdate): ChallengeDTO[] {
    return challenges.filter((challenge) => {
      const typeMatch = this.matchesFilterType(
        filter.type,
        challenge.premium ? CHALLENGE_TYPE.PREMIUM : CHALLENGE_TYPE.FREE,
      );
      const difficultyMatch = this.matchesFilterType(filter.difficulty, challenge.difficulty);
      const languageMatch = this.matchesFilterType(filter.language, challenge.language);

      return typeMatch && difficultyMatch && languageMatch;
    });
  }
}
