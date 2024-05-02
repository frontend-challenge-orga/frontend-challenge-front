import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { getServerAuthSession } from "@/config/server/auth";
import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";

export default async function ChallengesPage() {
  return (
    <ChallengesPageContainer
      getServerAuthSession={() => getServerAuthSession()}
      getChallenges={() => challengeService.getChallenges()}
    />
  );
}
