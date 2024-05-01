import type { ChallengeSolution } from "@/core/domain/entities/challenge.solution.entity";

export interface IChallengeSolutionRepository {
  createChallengeSolution: (
    data: ChallengeSolution,
  ) => Promise<ChallengeSolution>;
  findByChallengeSlug: (slug: string) => Promise<ChallengeSolution[]>;
  findByChallengeId: (challengeId: string) => Promise<ChallengeSolution[]>;
  hasUserSubmittedSolution: (userId: string, slug: string) => Promise<boolean>;
}
