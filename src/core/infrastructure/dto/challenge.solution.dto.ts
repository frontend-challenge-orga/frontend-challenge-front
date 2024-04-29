export type ChallengeSolutionDTO = {
  readonly id: string;
  readonly title: string;
  readonly repository_url: string;
  readonly live_preview_url: string;
  readonly stacks: string[];
  readonly solution_retrospective: string;
  readonly userId: string;
  readonly challengeId: number;
};
