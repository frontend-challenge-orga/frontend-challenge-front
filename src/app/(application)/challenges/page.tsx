import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";
import { getServerAuthSession } from "@/config/server/auth";
import { challengesServiceHandler } from "@/core/views/page-handler/challenges-service-handler";

export default async function ChallengesPage() {
  return (
    <ChallengesPageContainer
      getServerAuthSession={getServerAuthSession}
      challengesServiceHandler={challengesServiceHandler}
    />
  );
}
