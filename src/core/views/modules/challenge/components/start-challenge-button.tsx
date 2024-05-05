import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { AlreadyStartedChallengeButton } from "@/core/views/modules/challenge/components/already-started-challenge-button";
import { UnlockLockProButton } from "@/core/views/modules/challenge/components/unlock-lock-pro-button";
import { useChallengePage } from "@/core/views/modules/challenge/context/challenge-page-context";
import { SessionGuard } from "@/core/views/modules/auth/components/session-guard";

type Props = {
  isPending: boolean;
  isPremiumChallenge: boolean;
};

export const StartChallengeButton = ({ isPending, isPremiumChallenge }: Props) => {
  const { session, challenge, userAlreadyStartedChallenge, isSubscribed } = useChallengePage();

  const renderChallengeButton = () => {
    if (userAlreadyStartedChallenge) {
      return <AlreadyStartedChallengeButton slug={challenge.slug} />;
    }

    if (isPremiumChallenge && !isSubscribed) {
      return <UnlockLockProButton />;
    }

    return (
      <SessionGuard session={session}>
        <ButtonSubmit isPending={isPending}>Start challenge</ButtonSubmit>
      </SessionGuard>
    );
  };

  return renderChallengeButton();
};
