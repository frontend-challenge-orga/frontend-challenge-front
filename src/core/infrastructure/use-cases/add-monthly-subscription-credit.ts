import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";

export async function addMonthlySubscriptionCredit(userId: string) {
  await creditRepository.store(userId);
}
