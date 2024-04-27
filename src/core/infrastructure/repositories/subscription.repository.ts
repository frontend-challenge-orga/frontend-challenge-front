import { db } from "@/config/server/db";
import type { ISubscriptionRepository } from "@/core/domain/repositories/subscription.repository";

export const subscriptionRepository: ISubscriptionRepository = {
  show: async (userId: string) => {
    try {
      return await db.subscription.findUniqueOrThrow({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  store: async (
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ) => {
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
  },

  update: async (userId: string) => {
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
  },

  cancel: async (userId: string) => {
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
  },
};
