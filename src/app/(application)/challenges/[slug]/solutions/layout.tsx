import * as React from "react";
import { getServerAuthSession } from "@/config/server/auth";
import { LockedSolution } from "@/core/views/modules/challenge/components/locked-solution";
import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";

type Props = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export default async function ChallengeSolutionsLayout({
  children,
  params,
}: Props) {
  const session = await getServerAuthSession();

  const hasUserSubmittedSolution =
    await challengeSolutionService.hasUserSubmittedSolution(
      session!.user.id,
      params.slug,
    );

  const isUserPremium = session!.user.subscribed;

  if (!hasUserSubmittedSolution && !isUserPremium) {
    return <LockedSolution />;
  }

  return <div>{children}</div>;
}
