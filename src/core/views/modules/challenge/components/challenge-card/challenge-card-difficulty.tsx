import type { Difficulty } from "@/core/domain/entities/challenge.entity";
import { difficultyColor } from "@/core/views/modules/challenge/components/challenge-card/difficulty-color";

type Props = {
  difficulty: Difficulty;
};

export const ChallengeCardDifficulty = ({ difficulty }: Props) => {
  return (
    <div
      className={`text-white font-semibold text-medium px-2 py-1 rounded-md`}
      style={{ backgroundColor: difficultyColor(difficulty) }}
    >
      {difficulty}
    </div>
  );
};
