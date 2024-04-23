import { getCredit, createCredit, updateCredit } from "@/data-access/credit";

export async function addMonthlySubscriptionCredit(userId: string) {
  const userCredits = await getCredit(userId);

  if (userCredits) {
    await updateCredit(userId);
  } else {
    await createCredit(userId);
  }
}
