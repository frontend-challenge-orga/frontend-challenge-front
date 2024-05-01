import type { WebhookEvent } from "@/core/domain/entities/webhook.event.entity";
import type { WebhookEventDTO } from "@/core/infrastructure/dto/webhook.event.dto";

export class WebhookEventTransformer {
  static toDomain(webhookEventDTO: WebhookEventDTO): WebhookEvent {
    return webhookEventDTO;
  }

  static toEntity(webhookEvent: WebhookEvent): WebhookEventDTO {
    return webhookEvent;
  }
}
