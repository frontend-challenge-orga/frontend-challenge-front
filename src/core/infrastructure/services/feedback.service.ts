import { feedbackRepository } from "@/core/infrastructure/repositories/feedback.repository";
import { FeedbackTransformer } from "@/core/infrastructure/transformers/feedback-transformer";
import type { Feedback } from "@/core/domain/entities/feedback.entity";
import type { FeedbackDTO, FeedbackViewDTO } from "@/core/infrastructure/dto/feedback.dto";

interface IFeedbackService {
  getFeedbacks(challengeSolutionId: string): Promise<FeedbackViewDTO[] | null>;
  createFeedback(data: Feedback): Promise<FeedbackDTO>;
}

export const feedbackService: IFeedbackService = {
  getFeedbacks: async (challengeSolutionId) => {
    return feedbackRepository.shows(challengeSolutionId).then((feedbacks) => {
      return feedbacks?.map((feedback) => FeedbackTransformer.toView(feedback)) ?? null;
    });
  },

  createFeedback: async (data) => {
    return feedbackRepository.create(data).then((feedback) => {
      return FeedbackTransformer.toCreate(feedback);
    });
  },
};
