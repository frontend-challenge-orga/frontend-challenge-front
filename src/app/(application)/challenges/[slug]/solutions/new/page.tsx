import { ChallengeNotFound } from "@/core/views/modules/challenge/components/challenge-not-found";
import { ChallengeSolutionForm } from "@/core/views/modules/challenge/forms/challenge-solution-form";
import { challengeService } from "@/core/infrastructure/services/challenge.service";

type Props = {
  params: {
    slug: string;
  };
};

export default async function NewSolutionPage({ params }: Props) {
  const challenge = await challengeService.getChallengeBySlug(params.slug);

  if (!challenge) {
    return <ChallengeNotFound />;
  }

  return <ChallengeSolutionForm challenge={challenge} />;
}
