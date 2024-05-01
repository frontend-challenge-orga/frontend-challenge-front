import { webhookEventRepository } from "@/core/infrastructure/repositories/webhook.event.repository";
import { WebhookEventTransformer } from "@/core/infrastructure/transformers/webhook-event-transformer";
import type { WebhookEventDTO } from "@/core/infrastructure/dto/webhook.event.dto";

interface IWebhookEventService {
  createEvent(event: WebhookEventDTO): Promise<WebhookEventDTO>;
  findByIdempotency(
    event_idempotency_key: string,
  ): Promise<WebhookEventDTO | null>;
}

export const webhookEventService: IWebhookEventService = {
  createEvent: async (event) => {
    return webhookEventRepository.create(event).then((event) => {
      return WebhookEventTransformer.toEntity(event);
    });
  },

  findByIdempotency: async (event_idempotency_key: string) => {
    return webhookEventRepository.find(event_idempotency_key);
  },
};
