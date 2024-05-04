import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";
import { getServerAuthSession } from "@/config/server/auth";
import { getChallenges } from "@/core/infrastructure/use-cases/get-challenges";

export default async function ChallengesPage() {
  return <ChallengesPageContainer getServerAuthSession={getServerAuthSession} getChallenges={getChallenges} />;
}
