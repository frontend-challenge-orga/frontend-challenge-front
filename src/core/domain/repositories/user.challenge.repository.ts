import type { UserChallenge } from "@/core/domain/entities/user.challenge.entity";

export interface IUserChallengeRepository {
  startChallenge(userId: string, challengeId: string): Promise<UserChallenge>;
  hasUserStartedChallenge(
    userId: string,
    challengeId: string,
  ): Promise<boolean>;
}
