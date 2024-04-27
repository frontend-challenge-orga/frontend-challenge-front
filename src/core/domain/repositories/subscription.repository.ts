import type { Subscription } from "@/core/domain/entities/subscription.entity";

export interface ISubscriptionRepository {
  show(userId: string): Promise<Subscription | undefined>;
  store(
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ): Promise<void>;
  update(userId: string): Promise<void>;
  cancel(userId: string): Promise<Subscription | undefined>;
}
