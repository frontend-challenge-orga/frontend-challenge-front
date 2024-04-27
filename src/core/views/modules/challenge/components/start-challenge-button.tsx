import { ButtonLink } from "@/core/views/components/ui/button-link";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import type { Challenge } from "@prisma/client";
import type { Session } from "next-auth";
import { creditService } from "@/core/domain/services/token.service";
import { AlreadyStartedChallengeButton } from "@/core/views/modules/challenge/components/already-started-challenge-button";
import { UnlockLockProButton } from "@/core/views/modules/challenge/components/unlock-lock-pro-button";

type Props = {
  session: Session;
  challenge: Challenge;
  isPending: boolean;
  userHasStartedChallenge: boolean;
};

export const StartChallengeButton = ({
  session,
  challenge,
  isPending,
  userHasStartedChallenge,
}: Props) => {
  const validCreditBalance =
    creditService.checkValidityOfChallengeCreditBalance(
      session.user.credit_challenge_amount,
    );

  const renderChallengeButton = () => {
    if (userHasStartedChallenge) {
      return <AlreadyStartedChallengeButton slug={challenge.slug} />;
    }

    if (
      !validCreditBalance &&
      challenge.premium &&
      session.user.subscription_duration !== "YEARLY"
    ) {
      return <UnlockLockProButton />;
    }

    return <ButtonSubmit isPending={isPending}>Start challenge</ButtonSubmit>;
  };

  return renderChallengeButton();
};
