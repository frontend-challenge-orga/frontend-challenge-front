import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import { userChallengeRepository } from "@/core/infrastructure/repositories/user-challenge.repository";
import { StartChallengeForm } from "@/core/views/modules/challenge/forms/start-challenge-form";
import { getServerAuthSession } from "@/config/server/auth";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ChallengePage({ params }: Props) {
  const session = await getServerAuthSession();
  const challenge = await challengeRepository.showBySlug(params.slug);

  if (!session || !challenge) {
    return <div>Challenge not found</div>;
  }

  const userHasStartedChallenge =
    await userChallengeRepository.hasUserStartedChallenge(
      session.user.id,
      challenge.id,
    );

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <div>
      <StartChallengeForm
        challenge={challenge}
        session={session}
        userHasStartedChallenge={userHasStartedChallenge}
      />
    </div>
  );
}
