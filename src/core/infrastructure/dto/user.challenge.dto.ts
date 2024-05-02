export type UserChallengeDTO = {
  id: string;
  figma_file_unlocked: boolean;
  userId: string;
  challengeId: string;
  completedAt: Date | null;
};
