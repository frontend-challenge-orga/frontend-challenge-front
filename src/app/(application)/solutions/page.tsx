import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";
import { ChallengesGrid } from "@/core/views/modules/challenge/components/challenges-grid";
import { ChallengeCardSolution } from "@/core/views/modules/challenge/components/challenge-card-solution";

export default async function SolutionsPage() {
  const solutions = await challengeSolutionService.getChallengeSolutions();

  return (
    <ChallengesGrid>
      {solutions.map((solution) => (
        <ChallengeCardSolution key={solution.id} solution={solution} />
      ))}
    </ChallengesGrid>
  );
}
