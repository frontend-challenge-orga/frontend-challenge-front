import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";
import { creditService } from "@/core/domain/services/token.service";
import { userChallengeRepository } from "@/core/infrastructure/repositories/user-challenge.repository";
import { getProcessedCreditBalance } from "@/core/infrastructure/use-cases/get-processed-credit-balance";

export const startChallenge = async (
  userId: string,
  challengeId: number,
  isPremiumChallenge: boolean,
) => {
  if (isPremiumChallenge) {
    const currentCredit = await getProcessedCreditBalance(userId);

    if (
      creditService.checkValidityOfChallengeCreditBalance(
        currentCredit.challenge_amount,
      )
    )
      await creditRepository.subtractChallengeCredits(userId, 1);
  }

  await userChallengeRepository.startChallenge(userId, challengeId);
};
