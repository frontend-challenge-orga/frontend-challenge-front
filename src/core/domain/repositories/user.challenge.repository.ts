import type { UserChallenge } from "@/core/domain/entities/user.challenge.entity";

export interface IUserChallengeRepository {
  showById(userId: string, challengeId: string): Promise<UserChallenge | null>;
  showBySlug(userId: string, challengeSlug: string): Promise<UserChallenge | null>;
  create(userId: string, challengeId: string): Promise<UserChallenge>;
  unlockFigmaFile(userId: string, challengeId: string): Promise<UserChallenge>;
}
