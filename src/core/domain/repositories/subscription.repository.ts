import type { Subscription } from "@/core/domain/entities/subscription.entity";

export interface ISubscriptionRepository {
  index(): Promise<Subscription[]>;
  show(userId: string): Promise<Subscription>;
  store(
    userId: string,
    subscriptionId: string,
    subscriptionDuration: "MONTHLY" | "YEARLY",
    subscriptionEndDate: Date,
  ): Promise<Subscription>;
  update(userId: string): Promise<Subscription>;
  cancel(userId: string): Promise<Subscription>;
}
