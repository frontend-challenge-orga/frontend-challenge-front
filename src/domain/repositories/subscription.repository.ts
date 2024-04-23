import type { Subscription } from "@/domain/models/subscription.model";

export interface ISubscriptionRepository {
  getSubscription(userId: string): Promise<Subscription | undefined>;
  createSubscription(userId: string, subscriptionId: string): Promise<void>;
  updateSubscription(userId: string): Promise<void>;
  cancelSubscription(userId: string): Promise<void>;
}
