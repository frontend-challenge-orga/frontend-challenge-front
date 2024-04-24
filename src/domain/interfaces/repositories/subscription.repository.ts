import type { Subscription } from "@/domain/models/subscription.model";

export interface ISubscriptionRepository {
  getSubscription(userId: string): Promise<Subscription | undefined>;
  getSubscriptionById(userId: string): Promise<string | undefined>;
  createSubscription(
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
  ): Promise<void>;
  updateSubscription(userId: string): Promise<void>;
  cancelSubscription(
    userId: string,
    subscriptionEndDate: Date,
  ): Promise<Subscription | undefined>;
}
