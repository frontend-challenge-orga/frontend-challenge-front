import type { Feedback } from "@/core/domain/entities/feedback.entity";

export interface IFeedbackRepository {
  index(): Promise<Feedback[]>;
  show(challengeId: string): Promise<Feedback | null>;
  create(data: Feedback): Promise<Feedback>;
  update(id: string, data: Feedback): Promise<Feedback | undefined>;
  /* remove(id: string): Promise<void>;*/
}
