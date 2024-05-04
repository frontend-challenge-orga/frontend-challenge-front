import type { Difficulty } from "@/core/domain/entities/challenge.entity";

export function difficultyColor(difficulty: Difficulty) {
  const color = {
    NEWBIE: "#6ABECD",
    JUNIOR: "#AAD742",
    INTERMEDIATE: "#F1B604",
    ADVANCED: "#F48925",
    GURU: "#ED2C49",
  };

  return color[difficulty];
}
