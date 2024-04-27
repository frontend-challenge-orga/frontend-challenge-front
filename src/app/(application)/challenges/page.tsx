import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import Link from "next/link";

export default async function ChallengesPage() {
  const challenges = await challengeRepository.index();

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
