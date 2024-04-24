import type { Subscription } from "@/domain/models/subscription.model";

export interface ISubscriptionRepository {
  getSubscription(userId: string): Promise<Subscription | undefined>;
  saveSubscription(
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ): Promise<void>;
  updateSubscription(userId: string): Promise<void>;
  cancelSubscription(
    userId: string,
    subscriptionEndDate: Date,
  ): Promise<Subscription | undefined>;
}
