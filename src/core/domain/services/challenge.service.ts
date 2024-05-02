import type { Difficulty } from "@/core/domain/entities/challenge.entity";

class ChallengeService {
  public static getPointsForChallengeDifficulty(
    difficulty: Difficulty,
  ): number {
    switch (difficulty) {
      case "NEWBIE":
        return 10;
      case "JUNIOR":
        return 20;
      case "INTERMEDIATE":
        return 30;
      case "ADVANCED":
        return 40;
      case "GURU":
        return 50;
    }
  }
}

export const challengeService = ChallengeService;
