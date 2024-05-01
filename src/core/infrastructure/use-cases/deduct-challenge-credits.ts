import { creditService } from "@/core/infrastructure/services/credit.service";

export async function deductChallengeCredits(userId: string) {
  await creditService.subtractChallengeCredits(userId, 1);
}
