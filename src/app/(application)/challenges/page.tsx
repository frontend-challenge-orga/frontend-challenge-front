import Link from "next/link";
import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { SessionGuard } from "@/core/views/modules/auth/components/session-guard";
import { getServerAuthSession } from "@/config/server/auth";

export default async function ChallengesPage() {
  const session = await getServerAuthSession();
  const challenges = await challengeService.getChallenges();

  return (
    <div>
      {challenges?.map((challenge) => (
        <div key={challenge.id}>
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
