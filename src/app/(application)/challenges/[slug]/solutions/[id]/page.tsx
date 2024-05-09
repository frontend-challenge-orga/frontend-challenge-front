import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";

type Props = {
  params: {
    id: string;
  };
};

export default async function ChallengeSolutionPage({ params }: Props) {
  const solution = await challengeSolutionService.findByChallengeId(params.id);

  console.log(solution);

  return (
    <div>
      <h1>ChallengeSolutionPage</h1>
    </div>
  );
}
