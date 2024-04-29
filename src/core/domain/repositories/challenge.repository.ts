import type {
  Challenge,
  ChallengeSolution,
} from "@/core/domain/entities/challenge.entity";

export interface IChallengeRepository {
  index(): Promise<Challenge[]>;
  show(id: number): Promise<Challenge>;
  showBySlug(slug: string): Promise<Challenge>;
  count(): Promise<number | undefined>;
  create(data: Challenge): Promise<Challenge>;
  update(id: number, data: Challenge): Promise<Challenge | undefined>;
}

export interface IUserChallengeRepository {
  startChallenge(userId: string, challengeId: number): Promise<void>;
  hasUserStartedChallenge(
    userId: string,
    challengeId: number,
  ): Promise<boolean>;
}

export interface IChallengeSolutionRepository {
  createChallengeSolution: (
    data: ChallengeSolution,
  ) => Promise<ChallengeSolution>;
  findByChallengeSlug: (slug: string) => Promise<ChallengeSolution[]>;
  hasUserSubmittedSolution: (userId: string, slug: string) => Promise<boolean>;
}
