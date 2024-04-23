import { db } from "@/config/server/db";

export async function addMonthlyCredit(userId: string) {
  try {
    const userCredits = await db.credit.findUnique({
      where: { userId: userId },
    });

    if (userCredits) {
      await db.credit.update({
        where: { userId: userId },
        data: {
          challenge_amount: {
            increment: 2,
          },
          design_amount: {
            increment: 5,
          },
        },
      });
    } else {
      await db.credit.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          challenge_amount: 2,
          design_amount: 5,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
