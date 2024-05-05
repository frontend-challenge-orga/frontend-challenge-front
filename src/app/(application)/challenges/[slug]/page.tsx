import { getServerAuthSession } from "@/config/server/auth";
import { ChallengePageContainer } from "@/core/views/modules/challenge/pages/challenge-page-container";
import { challengeServiceHandler } from "@/core/views/page-handler/challenge-service-handler";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ChallengePage({ params }: Props) {
  return (
    <ChallengePageContainer
      getServerAuthSession={getServerAuthSession}
      challengeServiceHandler={challengeServiceHandler}
      params={params}
    />
  );
}
