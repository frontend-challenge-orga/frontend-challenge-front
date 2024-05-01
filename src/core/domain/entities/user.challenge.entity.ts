export type UserChallenge = {
  readonly id: string;
  readonly userId: string;
  readonly challengeId: string;
  readonly completedAt: Date | null;
};
