import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";

export const challengesServiceHandler = async () => {
  const challenges = await challengeService.getChallenges();
  const getCompletedChallenges = async (userId: string) => challengeSolutionService.getCompletedChallenges(userId);

  return { challenges, getCompletedChallenges };
};
