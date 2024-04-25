export interface ISubscriptionService {
  isSubscriptionActive(userId: string): Promise<boolean>;
}
