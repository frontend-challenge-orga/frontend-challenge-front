import { db } from "@/config/server/db";

class SubscriptionService {
  async createSubscription(userId: string, subscriptionId: string) {
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

  async updateSubscription(userId: string) {
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

  async cancelSubscription(userId: string) {
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
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;
