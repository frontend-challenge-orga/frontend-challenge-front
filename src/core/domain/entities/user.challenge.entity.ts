export type UserChallenge = {
  readonly id: string;
  readonly figma_file_unlocked: boolean;
  readonly userId: string;
  readonly challengeId: string;
  readonly completedAt: Date | null;
};
