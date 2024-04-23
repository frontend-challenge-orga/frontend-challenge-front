import { db } from "@/config/server/db";

export async function getCredit(userId: string) {
  try {
    return await db.credit.findUnique({
      where: { userId: userId },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createCredit(userId: string) {
  try {
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
  } catch (error) {
    console.log(error);
  }
}

export async function updateCredit(userId: string) {
  try {
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
  } catch (error) {
    console.log(error);
  }
}
