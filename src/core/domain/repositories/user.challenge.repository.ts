import type { UserChallenge } from "@/core/domain/entities/user.challenge.entity";

export interface IUserChallengeRepository {
  getStartedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<UserChallenge | null>;
  getStartedChallengeBySlug(
    userId: string,
    challengeSlug: string,
  ): Promise<UserChallenge | null>;
  startChallenge(userId: string, challengeId: string): Promise<UserChallenge>;
  unlockFigmaFile(userId: string, challengeId: string): Promise<UserChallenge>;
  hasUserStartedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<boolean>;
}
