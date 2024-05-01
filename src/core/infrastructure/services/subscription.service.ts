import { SubscriptionTransformer } from "@/core/infrastructure/transformers/subscription-transformer";
import { subscriptionRepository } from "@/core/infrastructure/repositories/subscription.repository";
import type { Subscription } from "@/core/domain/entities/subscription.entity";

interface ISubscriptionService {
  getSubscriptions(): Promise<Subscription[]>;
  getSubscriptionById(userId: string): Promise<Subscription>;
  createSubscription(
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ): Promise<Subscription>;
  updateSubscription(userId: string): Promise<Subscription>;
  cancelSubscription(userId: string): Promise<Subscription>;
}

export const subscriptionService: ISubscriptionService = {
  getSubscriptions: async () => {
    return subscriptionRepository.index().then((subscriptions) => {
      return subscriptions?.map((subscription: Subscription) => {
        return SubscriptionTransformer.toEntity(subscription);
      });
    });
  },

  getSubscriptionById: async (userId: string) => {
    return subscriptionRepository.show(userId).then((subscription) => {
      return SubscriptionTransformer.toEntity(subscription);
    });
  },

  createSubscription: async (
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ) => {
    return subscriptionRepository
      .store(userId, subscriptionId, subscriptionDuration, subscriptionEndDate)
      .then((subscription) => {
        return SubscriptionTransformer.toEntity(subscription);
      });
  },

  updateSubscription: async (userId: string) => {
    return subscriptionRepository.update(userId).then((subscription) => {
      return SubscriptionTransformer.toEntity(subscription);
    });
  },

  cancelSubscription: async (userId: string) => {
    return subscriptionRepository.cancel(userId).then((subscription) => {
      return SubscriptionTransformer.toEntity(subscription);
    });
  },
};
