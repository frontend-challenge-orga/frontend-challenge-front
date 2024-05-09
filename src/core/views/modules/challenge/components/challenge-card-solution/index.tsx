import { ChallengeCard } from "@/core/views/modules/challenge/components/challenge-card";
import { ChallengeCardSolutionUserProfile } from "@/core/views/modules/challenge/components/challenge-card-solution/challenge-card-solution-user-profile";
import { ChallengeCardSolutionRetrospective } from "@/core/views/modules/challenge/components/challenge-card-solution/challenge-card-solution-retrospective";
import type { ChallengeSolutionViewDTO } from "@/core/infrastructure/dto/challenge.solution.dto";

type Props = {
  solution: ChallengeSolutionViewDTO;
};

export const ChallengeCardSolution = ({ solution }: Props) => {
  return (
    <ChallengeCard challenge={solution.challenge} solutionId={solution.id} type={"solution"}>
      <ChallengeCardSolutionUserProfile user={solution.user} />
      <ChallengeCardSolutionRetrospective retrospective={solution.solution_retrospective} />
    </ChallengeCard>
  );
};
