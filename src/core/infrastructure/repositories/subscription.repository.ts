import { db } from "@/config/server/db";
import type { ISubscriptionRepository } from "@/core/domain/repositories/subscription.repository";

export const subscriptionRepository: ISubscriptionRepository = {
  index: async () => {
    return db.subscription.findMany();
  },

  show: async (userId: string) => {
    return db.subscription.findUnique({
      where: {
        userId,
      },
    });
  },

  store: async (
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ) => {
    return db.subscription.upsert({
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
  },

  update: async (userId: string) => {
    return db.subscription.update({
      where: {
        userId,
      },
      data: {
        subscribed: true,
        subscribed_at: new Date(),
      },
    });
  },

  cancel: async (userId: string) => {
    return db.subscription.update({
      where: {
        userId,
      },
      data: {
        subscribed: false,
        subscription_cancelled_at: new Date(),
      },
    });
  },
};
