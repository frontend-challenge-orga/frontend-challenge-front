import { creditService } from "@/core/domain/services/token.service";
import type { Session } from "next-auth";

export function determineChallengeButtonText(
  session: Session,
  isPremium: boolean,
) {
  const hasValidCredit = creditService.checkValidityOfChallengeCreditBalance(
    session.user.credit_challenge_amount,
  );

  if (isPremium && hasValidCredit) {
    return "Start challenge";
  }
  if (isPremium && !hasValidCredit) {
    return "Unlock pro";
  }
  return "Start challenge";
}
