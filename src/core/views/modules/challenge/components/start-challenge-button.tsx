import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { AlreadyStartedChallengeButton } from "@/core/views/modules/challenge/components/already-started-challenge-button";
import { UnlockLockProButton } from "@/core/views/modules/challenge/components/unlock-lock-pro-button";
import { SUBSCRIPTION } from "@/config/constants";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { Session } from "next-auth";

type Props = {
  session: Session;
  challenge: ChallengeDTO;
  isPending: boolean;
  userHasStartedChallenge: boolean;
};

export const StartChallengeButton = ({
  session,
  challenge,
  isPending,
  userHasStartedChallenge,
}: Props) => {
  const isChallengePremium = challenge.premium;
  const hasEnoughCredits = session.user.credit_challenge_amount > 0;
  const isMonthlySubscription =
    session.user.subscription_duration === SUBSCRIPTION.MONTHLY;

  const renderChallengeButton = () => {
    if (userHasStartedChallenge) {
      return <AlreadyStartedChallengeButton slug={challenge.slug} />;
    }

    if (isChallengePremium && isMonthlySubscription && !hasEnoughCredits) {
      return <UnlockLockProButton />;
    }

    return <ButtonSubmit isPending={isPending}>Start challenge</ButtonSubmit>;
  };

  return renderChallengeButton();
};
