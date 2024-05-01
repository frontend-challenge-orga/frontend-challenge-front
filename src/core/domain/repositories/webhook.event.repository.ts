import type { WebhookEvent } from "@/core/domain/entities/webhook.event.entity";

export interface IWebhookEventRepository {
  find(event_idempotency_key: string): Promise<WebhookEvent | null>;
  create(event: WebhookEvent): Promise<WebhookEvent>;
}
