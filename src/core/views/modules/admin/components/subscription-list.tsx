import type { SubscriptionDTO } from "@/core/infrastructure/dto/subscription.dto";

interface Props {
  subscriptions: SubscriptionDTO[];
}

export const SubscriptionList = ({ subscriptions }: Props) => {
  return (
    <div>
      <h1>Subscriptions</h1>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>{subscription.subscription_id}</li>
        ))}
      </ul>
    </div>
  );
};
