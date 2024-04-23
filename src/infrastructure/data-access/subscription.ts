import { db } from "@/config/server/db";

export async function createSubscription(
  userId: string,
  subscriptionId: string,
) {
  try {
    await db.subscription.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        subscription_id: subscriptionId,
        subscribed_at: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateSubscription(userId: string) {
  try {
    await db.subscription.update({
      where: {
        userId,
      },
      data: {
        subscribed: true,
        subscribed_at: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function cancelSubscription(userId: string) {
  try {
    await db.subscription.update({
      where: {
        userId,
      },
      data: {
        subscribed: false,
        subscribed_at: null,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
