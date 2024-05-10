import type { User } from "@/core/domain/entities/user.entity";
import type { Challenge } from "@/core/domain/entities/challenge.entity";

export type ChallengeSolution = {
  readonly id: string;
  readonly title: string;
  readonly repository_url: string;
  readonly live_preview_url: string;
  readonly stacks: string[];
  readonly solution_retrospective: string;
  readonly userId: string;
  readonly challengeId: string;
  readonly user: User;
  readonly challenge: Challenge;
};

export type ChallengeSolutionSave = Omit<ChallengeSolution, "user" | "challenge">;
