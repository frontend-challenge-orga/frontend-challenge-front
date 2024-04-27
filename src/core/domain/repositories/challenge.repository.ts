import type { Challenge } from "@/core/domain/entities/challenge.entity";

export interface IChallengeRepository {
  index(): Promise<Challenge[] | undefined>;
  show(id: number): Promise<Challenge | undefined>;
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
