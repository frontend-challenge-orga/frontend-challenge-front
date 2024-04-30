import type {
  Challenge,
  ChallengeSolution,
} from "@/core/domain/entities/challenge.entity";

export interface IChallengeRepository {
  index(): Promise<Challenge[]>;
  show(id: string): Promise<Challenge>;
  showBySlug(slug: string): Promise<Challenge>;
  count(): Promise<number | undefined>;
  create(data: Challenge): Promise<Challenge>;
  update(id: string, data: Challenge): Promise<Challenge | undefined>;
}

export interface IUserChallengeRepository {
  startChallenge(userId: string, challengeId: string): Promise<void>;
  hasUserStartedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<boolean>;
}

export interface IChallengeSolutionRepository {
  createChallengeSolution: (
    data: ChallengeSolution,
  ) => Promise<ChallengeSolution>;
  findByChallengeSlug: (slug: string) => Promise<ChallengeSolution[]>;
  findByChallengeId: (challengeId: string) => Promise<ChallengeSolution[]>;
  hasUserSubmittedSolution: (userId: string, slug: string) => Promise<boolean>;
}
