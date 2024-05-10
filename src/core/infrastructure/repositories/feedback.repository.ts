import { db } from "@/config/server/db";
import type { IFeedbackRepository } from "@/core/domain/repositories/feedback.repository";
import { FeedbackTransformer } from "@/core/infrastructure/transformers/feedback-transformer";

export const feedbackRepository: IFeedbackRepository = {
  index: async () => {
    return db.feedback.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
      },
    });
  },

  shows: async (challengeSolutionId: string) => {
    return db.feedback.findMany({
      where: {
        challengeSolutionId,
      },
      include: {
        user: true,
      },
    });
  },

  create: async (data) => {
    const feedback = FeedbackTransformer.toCreate(data);
    return db.feedback.create({ data: feedback });
  },

  update: async (id, data) => {
    return db.feedback.update({
      where: {
        id,
      },
      data,
    });
  },
};
