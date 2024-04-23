import {
  getCredit,
  createCredit,
  updateCredit,
} from "@/infrastructure/data-access/credit";

export async function addMonthlySubscriptionCredit(userId: string) {
  const userCredits = await getCredit(userId);

  userCredits ? await updateCredit(userId) : await createCredit(userId);
}
