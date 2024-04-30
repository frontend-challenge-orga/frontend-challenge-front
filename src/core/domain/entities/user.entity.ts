export type User = {
  readonly id: string;
  readonly name: string | null;
  readonly email: string | null;
  readonly emailVerified: Date | null;
  readonly image: string | null;
  readonly role: "USER" | "COLLABORATOR" | "ADMIN";
  readonly points: number;
};

export type UserChallenge = {
  readonly id: string;
  readonly userId: string;
  readonly challengeId: string;
  readonly completedAt: Date | null;
};
