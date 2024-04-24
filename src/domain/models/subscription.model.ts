export type Subscription = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  subscribed: boolean;
  subscribed_at: Date | null;
  subscription_id: string;
  subscription_end_at: Date | null;
  userId: string;
};
