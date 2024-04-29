export type Subscription = {
  readonly id: number;
  readonly subscribed: boolean;
  readonly subscription_id: string;
  readonly subscription_duration: "MONTHLY" | "YEARLY";
  readonly subscribed_at: Date | null;
  readonly subscription_end_at: Date | null;
  readonly subscription_cancelled_at: Date | null;
  readonly userId: string;
};
