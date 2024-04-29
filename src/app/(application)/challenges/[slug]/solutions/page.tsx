import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";

type Props = {
  params: {
    slug: string;
  };
};

// Layout: Validation user subscription and solution submission

export default async function ChallengeSolutionsPage({ params }: Props) {
  const challenges = await challengeSolutionService.findByChallengeSlug(
    params.slug,
  );

  console.log(challenges);

  return <p></p>;
}
