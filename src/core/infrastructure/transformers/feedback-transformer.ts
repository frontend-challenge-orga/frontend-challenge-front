import type { Feedback } from "@/core/domain/entities/feedback.entity";
import type { FeedbackDTO } from "@/core/infrastructure/dto/feedback.dto";

export class FeedbackTransformer {
  static toDomain(createFeedbackDTO: FeedbackDTO): Feedback {
    return {
      ...createFeedbackDTO,
    };
  }
  static toEntity(feedback: Feedback): FeedbackDTO {
    return feedback;
  }
}
