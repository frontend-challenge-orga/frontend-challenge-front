import type { UserDTO } from "@/core/infrastructure/dto/user.dto";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

export type ChallengeSolutionDTO = {
  id: string;
  title: string;
  repository_url: string;
  live_preview_url: string;
  stacks: string[];
  solution_retrospective: string;
  userId: string;
  challengeId: string;
};

export type ChallengeSolutionViewDTO = {
  user: UserDTO;
  challenge: ChallengeDTO;
} & ChallengeSolutionDTO;
