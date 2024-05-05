import { SubscriptionTransformer } from "@/core/infrastructure/transformers/subscription-transformer";
import { subscriptionRepository } from "@/core/infrastructure/repositories/subscription.repository";
import type { Subscription } from "@/core/domain/entities/subscription.entity";

export interface ISubscriptionService {
  getSubscriptions(): Promise<Subscription[]>;
  getSubscriptionByUserId(userId: string): Promise<Subscription>;
  createSubscription(
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ): Promise<Subscription>;
  cancelSubscription(userId: string): Promise<Subscription>;
  isSubscribed(userId: string | undefined): Promise<boolean>;
  isYearlySubscribed(userId: string): Promise<boolean>;
  isMonthlySubscribed(userId: string): Promise<boolean>;
}

export const subscriptionService: ISubscriptionService = {
  getSubscriptions: async () => {
    return subscriptionRepository.index().then((subscriptions) => {
      return subscriptions?.map((subscription: Subscription) => {
        return SubscriptionTransformer.toEntity(subscription);
      });
    });
  },

  getSubscriptionByUserId: async (userId: string) => {
    return subscriptionRepository.show(userId).then((subscription) => {
      // TODO - Remove this check and throw an error
      if (!subscription) throw new Error("Subscription not found");

      return SubscriptionTransformer.toEntity(subscription);
    });
  },

  createSubscription: async (userId, subscriptionId, subscriptionDuration, subscriptionEndDate) => {
    return subscriptionRepository
      .store(userId, subscriptionId, subscriptionDuration, subscriptionEndDate)
      .then((subscription) => {
        return SubscriptionTransformer.toEntity(subscription);
      });
  },

  cancelSubscription: async (userId) => {
    return subscriptionRepository.cancel(userId).then((subscription) => {
      return SubscriptionTransformer.toEntity(subscription);
    });
  },

  isSubscribed: async (userId) => {
    if (!userId) return Promise.resolve(false);

    return subscriptionRepository.show(userId).then((subscription) => {
      return !!subscription?.subscribed;
    });
  },

  isYearlySubscribed: async (userId) => {
    return subscriptionRepository.show(userId).then((subscription) => {
      return subscription?.subscription_duration === "YEARLY";
    });
  },

  isMonthlySubscribed: async (userId) => {
    return subscriptionRepository.show(userId).then((subscription) => {
      return subscription?.subscription_duration === "MONTHLY";
    });
  },
};
