// Source

import subscriptionRepository from "@/infrastructure/data-access/subscription";
import type { ISubscriptionRepository } from "@/domain/interfaces/repositories/subscription.repository";
import type { ISubscriptionService } from "@/domain/interfaces/services/subscription.service";
import { checkSubscriptionActive } from "@/domain/services/utils/check-subscription-active";

class SubscriptionService implements ISubscriptionService {
  private subscriptionRepository: ISubscriptionRepository;

  constructor(subscriptionRepository: ISubscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async isSubscriptionActive(userId: string): Promise<boolean> {
    const subscription =
      await this.subscriptionRepository.getSubscription(userId);

    if (!subscription) throw new Error("Subscription not found");

    return checkSubscriptionActive(subscription);
  }
}

const subscriptionService = new SubscriptionService(subscriptionRepository);
export default subscriptionService;
