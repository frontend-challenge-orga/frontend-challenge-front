import type { Feedback, FeedbackSave } from "@/core/domain/entities/feedback.entity";

export interface IFeedbackRepository {
  index(): Promise<Feedback[]>;
  shows(challengeSolutionId: string): Promise<Feedback[] | null>;
  create(data: FeedbackSave): Promise<FeedbackSave>;
  update(id: string, data: FeedbackSave): Promise<FeedbackSave | undefined>;
  /* remove(id: string): Promise<void>;*/
}
