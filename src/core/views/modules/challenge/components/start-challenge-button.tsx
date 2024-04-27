import { determineChallengeButtonText } from "@/core/infrastructure/use-cases/determine-challenge-button-text";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import type { Challenge } from "@prisma/client";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
  challenge: Challenge;
  isPending: boolean;
};

export const StartChallengeButton = ({
  session,
  challenge,
  isPending,
}: Props) => {
  const currentButtonText = determineChallengeButtonText(
    session!,
    challenge.premium,
  );

  return <ButtonSubmit isPending={isPending}>{currentButtonText}</ButtonSubmit>;
};
