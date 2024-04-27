export type Credit = {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly challenge_amount: number;
  readonly design_amount: number;
  readonly userId: string;
};
