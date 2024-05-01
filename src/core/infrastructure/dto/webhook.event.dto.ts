export type WebhookEventDTO = {
  id: string;
  event_type: string;
  event_idempotency_key: string | null;
};
