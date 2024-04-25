export type Subscription = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  subscribed: boolean;
  subscription_id: string;
  subscription_duration: "MONTHLY" | "YEARLY";
  subscribed_at: Date | null;
  subscription_end_at: Date | null;
  subscription_cancelled_at: Date | null;
  userId: string;
};
