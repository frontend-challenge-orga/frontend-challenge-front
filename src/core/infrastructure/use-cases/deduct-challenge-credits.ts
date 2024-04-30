import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";

export async function deductChallengeCredits(userId: string) {
  await creditRepository.subtractChallengeCredits(userId, 1);
}
