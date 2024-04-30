import { DIFFICULTY_POINTS } from "@/config/constants";

export const getPointsForDifficulty = (
  difficulty: keyof typeof DIFFICULTY_POINTS,
): number => {
  return DIFFICULTY_POINTS[difficulty];
};
