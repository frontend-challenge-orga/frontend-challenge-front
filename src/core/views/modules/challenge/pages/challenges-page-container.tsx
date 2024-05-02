import { Link } from "lucide-react";
import type { Session } from "next-auth";
import { SessionGuard } from "../../auth/components/session-guard";
import { type ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  getChallenges: () => Promise<ChallengeDTO[]>;
  getServerAuthSession: () => Promise<Session | null>;
};

export async function ChallengesPageContainer({
  getChallenges,
  getServerAuthSession,
}: Props) {
  const session = await getServerAuthSession();
  const challenges = await getChallenges();

  return (
    <div>
      {challenges?.map((challenge) => (
        <div data-testid="challenge" key={challenge.id}>
          <h1>{challenge.name}</h1>
          <p>{challenge.description}</p>
          <SessionGuard session={session}>
            <Link href={`/challenges/${challenge.slug}`}>Go to challenge</Link>
          </SessionGuard>
        </div>
      ))}
    </div>
  );
}
