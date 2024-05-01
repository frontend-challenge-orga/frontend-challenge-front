import { db } from "@/config/server/db";
import type { IWebhookEventRepository } from "@/core/domain/repositories/webhook.event.repository";

export const webhookEventRepository: IWebhookEventRepository = {
  create: async (event) => {
    return db.webhookEvent.create({ data: event });
  },

  find: async (event_idempotency_key: string) => {
    return db.webhookEvent.findFirst({
      where: {
        event_idempotency_key: event_idempotency_key,
      },
    });
  },
};
