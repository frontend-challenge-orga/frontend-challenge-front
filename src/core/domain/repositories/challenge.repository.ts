import type {
  Challenge,
  ChallengeDTO,
} from "@/core/domain/entities/challenge.entity";

export interface IChallengeRepository {
  index(): Promise<Challenge[] | undefined>;
  show(id: number): Promise<Challenge | undefined>;
  showBySlug(slug: string): Promise<Challenge | undefined>;
  count(): Promise<number | undefined>;
  create(data: ChallengeDTO): Promise<Challenge>;
  update(id: number, data: ChallengeDTO): Promise<Challenge | undefined>;
}

export interface IUserChallengeRepository {
  startChallenge(userId: string, challengeId: number): Promise<void>;
  hasUserStartedChallenge(
    userId: string,
    challengeId: number,
  ): Promise<boolean>;
}
