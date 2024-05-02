import React from "react";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { getServerAuthSession } from "@/config/server/auth";
import { ProtectedChallengeHub } from "@/core/views/modules/challenge/components/protected-challenge-hub";
import { NotAuthenticated } from "@/core/views/components/layouts/not-authenticated";

type Props = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export default async function ChallengeHubLayout({ params, children }: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    return <NotAuthenticated session={session} />;
  }

  const alreadyStartedChallenge =
    await userChallengeService.getStartedChallengeBySlug(
      session.user.id,
      params.slug,
    );

  if (!alreadyStartedChallenge) {
    return <ProtectedChallengeHub slug={params.slug} />;
  }

  return <div>{children}</div>;
}
