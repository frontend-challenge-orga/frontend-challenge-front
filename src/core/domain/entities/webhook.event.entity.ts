export type WebhookEvent = {
  readonly id: string;
  readonly event_type: string;
  readonly event_idempotency_key: string | null;
};
