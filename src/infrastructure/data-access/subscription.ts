import { db } from "@/config/server/db";
import { ISubscriptionRepository } from "@/domain/repositories/subscription.repository";
import { Subscription } from "@/domain/models/subscription.model";

export class SubscriptionRepository implements ISubscriptionRepository {
  async getSubscription(userId: string): Promise<Subscription | undefined> {
    try {
      return await db.subscription.findUniqueOrThrow({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createSubscription(
    userId: string,
    subscriptionId: string,
  ): Promise<void> {
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

  async updateSubscription(userId: string): Promise<void> {
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

  async cancelSubscription(userId: string): Promise<void> {
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

const subscriptionRepository = new SubscriptionRepository();
export default subscriptionRepository;
