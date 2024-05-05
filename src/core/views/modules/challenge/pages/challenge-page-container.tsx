import { ChallengePageProvider } from "@/core/views/modules/challenge/context/challenge-page-context";
import { StartChallengeForm } from "@/core/views/modules/challenge/forms/start-challenge-form";
import type { Session } from "next-auth";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  getServerAuthSession: () => Promise<Session | null>;
  challengeServiceHandler: () => Promise<{
    getChallenge: (params: { slug: string }) => Promise<ChallengeDTO>;
    getStartedChallenge: (userId: string | undefined, params: { slug: string }) => Promise<boolean>;
    getSubscription: (userId: string | undefined) => Promise<boolean>;
  }>;
  params: {
    slug: string;
  };
};

export async function ChallengePageContainer({ getServerAuthSession, challengeServiceHandler, params }: Props) {
  const { getChallenge, getStartedChallenge, getSubscription } = await challengeServiceHandler();
  const session = await getServerAuthSession();
  const challenge = await getChallenge({ slug: params.slug });
  const userAlreadyStartedChallenge = await getStartedChallenge(session?.user.id, { slug: params.slug });
  const isSubscribed = await getSubscription(session?.user.id);

  return (
    <ChallengePageProvider
      session={session}
      challenge={challenge}
      userAlreadyStartedChallenge={userAlreadyStartedChallenge}
      isSubscribed={isSubscribed}
    >
      <StartChallengeForm />
    </ChallengePageProvider>
  );
}
