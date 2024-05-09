import { feedbackRepository } from "@/core/infrastructure/repositories/feedback.repository";
import { FeedbackTransformer } from "@/core/infrastructure/transformers/feedback-transformer";
import type { Feedback } from "@/core/domain/entities/feedback.entity";
import type { FeedbackDTO } from "@/core/infrastructure/dto/feedback.dto";

interface IFeedbackService {
  createFeedback(data: Feedback): Promise<FeedbackDTO>;
}

export const feedbackService: IFeedbackService = {
  createFeedback: async (data) => {
    return feedbackRepository.create(data).then((feedback) => {
      return FeedbackTransformer.toEntity(feedback);
    });
  },
};
