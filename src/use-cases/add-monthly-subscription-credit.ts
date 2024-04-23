import { getCredit, createCredit, updateCredit } from "@/data-access/credit";

export async function addMonthlySubscriptionCredit(userId: string) {
  const userCredits = await getCredit(userId);

  userCredits ? await updateCredit(userId) : await createCredit(userId);

  // Send email to user
}
