import type { UserDTO } from "@/core/infrastructure/dto/user.dto";

export type FeedbackDTO = {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  challengeSolutionId: string;
};

export type FeedbackViewDTO = {
  user: UserDTO;
} & FeedbackDTO;
