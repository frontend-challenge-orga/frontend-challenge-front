import { db } from "@/config/server/db";
import type { ISubscriptionRepository } from "@/domain/repositories/subscription.repository";
import type { Subscription } from "@/domain/models/subscription.model";

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

  async getSubscriptionId(userId: string): Promise<string | undefined> {
    try {
      const subscription = await db.subscription.findUniqueOrThrow({
        where: {
          userId,
        },
        select: {
          subscription_id: true,
        },
      });

      return subscription.subscription_id;
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

  async cancelSubscription(
    userId: string,
    subscriptionEndDate: Date,
  ): Promise<void> {
    try {
      await db.subscription.update({
        where: {
          userId,
        },
        data: {
          subscribed: false,
          subscription_end_at: subscriptionEndDate,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const subscriptionRepository = new SubscriptionRepository();
export default subscriptionRepository;
