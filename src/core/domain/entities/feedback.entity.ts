import type { User } from "@/core/domain/entities/user.entity";

export type Feedback = {
  readonly id: string;
  readonly comment: string;
  readonly rating: number;
  readonly userId: string;
  readonly challengeSolutionId: string;
  readonly user: User;
};

export type FeedbackSave = Omit<Feedback, "user">;
