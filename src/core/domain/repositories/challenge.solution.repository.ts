import type { ChallengeSolution, ChallengeSolutionSave } from "@/core/domain/entities/challenge.solution.entity";

export interface IChallengeSolutionRepository {
  index: () => Promise<ChallengeSolution[]>;
  createChallengeSolution: (data: ChallengeSolutionSave) => Promise<ChallengeSolutionSave>;
  findByChallengeSlug: (slug: string) => Promise<ChallengeSolution[]>;
  findByChallengeId: (challengeId: string) => Promise<ChallengeSolution[]>;
  hasUserSubmittedSolution: (userId: string, slug: string) => Promise<boolean>;
}
