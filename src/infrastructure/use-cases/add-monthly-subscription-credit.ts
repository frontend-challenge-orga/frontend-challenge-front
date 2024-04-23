import creditRepository from "@/infrastructure/data-access/credit";

export async function addMonthlySubscriptionCredit(userId: string) {
  await creditRepository.addCredits(userId);
}
