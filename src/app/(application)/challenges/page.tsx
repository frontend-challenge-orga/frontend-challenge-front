import Link from "next/link";
import { challengeService } from "@/core/infrastructure/services/challenge.service";

export default async function ChallengesPage() {
  const challenges = await challengeService.getChallenges();

  return (
    <div>
      {challenges?.map((challenge) => (
        <div key={challenge.id}>
          <h1>{challenge.name}</h1>
          <p>{challenge.description}</p>
          <Link href={`/challenges/${challenge.slug}`}>Go to challenge</Link>
        </div>
      ))}
    </div>
  );
}
