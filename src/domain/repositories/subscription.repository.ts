import type { Subscription } from "@/domain/models/subscription.model";

export interface ISubscriptionRepository {
  getSubscription(userId: string): Promise<Subscription | undefined>;
  getSubscriptionId(userId: string): Promise<string | undefined>;
  createSubscription(userId: string, subscriptionId: string): Promise<void>;
  updateSubscription(userId: string): Promise<void>;
  cancelSubscription(userId: string, subscriptionEndDate: Date): Promise<void>;
}
