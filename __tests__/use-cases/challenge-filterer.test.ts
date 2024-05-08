import { ChallengeFilterer } from "@/core/infrastructure/use-cases/challenge-filter";
import { ChallengeMock } from "../../__mocks__/challenge.mock";
import type { Difficulty, Language } from "@/core/domain/entities/challenge.entity";

describe("ChallengeFilterer", () => {
  let filterer: ChallengeFilterer;
  let challengeMockInstance: ChallengeMock;

  beforeEach(() => {
    filterer = new ChallengeFilterer();
    challengeMockInstance = new ChallengeMock();
  });

  test("should filter challenges correctly", async () => {
    const CHALLENGES_MOCK = [
      {
        ...challengeMockInstance,
        premium: true,
        difficulty: "NEWBIE" as Difficulty,
        language: "HTML_CSS" as Language,
      },

      {
        ...challengeMockInstance,
        premium: false,
        difficulty: "INTERMEDIATE" as Difficulty,
        language: "API" as Language,
      },
    ];

    const SEARCHPARAMS_MOCK = {
      type: "premium",
      difficulty: "newbie",
      language: "html_css",
    };

    const result = await filterer.do({ challenges: CHALLENGES_MOCK, searchParams: SEARCHPARAMS_MOCK });

    expect(result).toEqual([{ ...challengeMockInstance, premium: true, difficulty: "NEWBIE", language: "HTML_CSS" }]);
  });

  test("should parse search params correctly", () => {
    const SEARCHPARAMS_MOCK = {
      type: "premium",
      difficulty: "newbie",
      language: "html_css",
    };

    const result = filterer.parseUrlParams(SEARCHPARAMS_MOCK);

    expect(result).toEqual({ type: ["PREMIUM"], difficulty: ["NEWBIE"], language: ["HTML_CSS"] });
  });
});
