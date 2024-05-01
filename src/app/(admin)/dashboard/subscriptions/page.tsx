import { subscriptionService } from "@/core/infrastructure/services/subscription.service";
import { SubscriptionList } from "@/core/views/modules/admin/components/subscription-list";

export default async function SubscriptionsPage() {
  const subscriptions = await subscriptionService.getSubscriptions();

  return (
    <div>
      <SubscriptionList subscriptions={subscriptions} />
    </div>
  );
}
