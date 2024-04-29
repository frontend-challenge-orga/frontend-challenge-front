import { SubscriptionDTO } from "@/core/infrastructure/dto/subscription.dto";
import { Subscription } from "@/core/domain/entities/subscription.entity";

export class SubscriptionTransformer {
  static toDomain(subscriptionDTO: SubscriptionDTO): Subscription {
    return {
      ...subscriptionDTO,
      subscribed_at: subscriptionDTO.subscribed_at
        ? new Date(subscriptionDTO.subscribed_at)
        : null,
      subscription_end_at: subscriptionDTO.subscription_end_at
        ? new Date(subscriptionDTO.subscription_end_at)
        : null,
      subscription_cancelled_at: subscriptionDTO.subscription_cancelled_at
        ? new Date(subscriptionDTO.subscription_cancelled_at)
        : null,
    };
  }

  static toEntity(subscription: Subscription): SubscriptionDTO {
    return {
      ...subscription,
      subscribed_at: subscription.subscribed_at || null,
      subscription_end_at: subscription.subscription_end_at || null,
      subscription_cancelled_at: subscription.subscription_cancelled_at || null,
    };
  }
}
