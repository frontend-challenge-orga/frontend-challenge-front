import React from "react";
import { getServerAuthSession } from "@/config/server/auth";

import { checkUserSubmittedSolution } from "@/core/infrastructure/use-cases/check-user-submitted-solution";
import { LockedSolution } from "@/core/views/modules/challenge/components/locked-solution";

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

  const hasUserSubmittedSolution = await checkUserSubmittedSolution(
    session!,
    params.slug,
  );

  const isUserPremium = session!.user.subscribed;

  if (!hasUserSubmittedSolution && !isUserPremium) {
    return <LockedSolution />;
  }

  return <div>{children}</div>;
}
