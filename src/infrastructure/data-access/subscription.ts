import { db } from "@/config/server/db";
import type { ISubscriptionRepository } from "@/domain/interfaces/repositories/subscription.repository";
import type { Subscription } from "@/domain/models/subscription.model";
import type { SubscriptionDurationEnum } from "@/config/types";

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

  async saveSubscription(
    userId: string,
    subscriptionId: string,
    subscriptionDuration: SubscriptionDurationEnum,
    subscriptionEndDate: Date,
  ): Promise<void> {
    try {
      await db.subscription.upsert({
        where: {
          userId,
        },
        create: {
          userId,
          subscription_id: subscriptionId,
          subscription_duration: subscriptionDuration,
          subscribed: true,
          subscribed_at: new Date(),
          subscription_end_at: subscriptionEndDate,
        },
        update: {
          subscription_id: subscriptionId,
          subscription_duration: subscriptionDuration,
          subscribed: true,
          subscribed_at: new Date(),
          subscription_end_at: subscriptionEndDate,
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

  async cancelSubscription(userId: string): Promise<Subscription | undefined> {
    try {
      return await db.subscription.update({
        where: {
          userId,
        },
        data: {
          subscribed: false,
          subscription_cancelled_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const subscriptionRepository = new SubscriptionRepository();
export default subscriptionRepository;
