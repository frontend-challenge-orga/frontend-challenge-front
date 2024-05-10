import type { Feedback, FeedbackSave } from "@/core/domain/entities/feedback.entity";
import type { FeedbackDTO, FeedbackViewDTO } from "@/core/infrastructure/dto/feedback.dto";

export class FeedbackTransformer {
  static toEntity(feedback: Feedback): FeedbackDTO {
    return feedback;
  }

  static toCreate(feedback: FeedbackSave): FeedbackDTO {
    return {
      ...feedback,
    };
  }

  static toView(feedback: Feedback): FeedbackViewDTO {
    return {
      ...feedback,
    };
  }
}
