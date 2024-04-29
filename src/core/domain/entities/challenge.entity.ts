export type Challenge = {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly language: "HTML_CSS" | "JS" | "API";
  readonly difficulty:
    | "NEWBIE"
    | "JUNIOR"
    | "INTERMEDIATE"
    | "ADVANCED"
    | "GURU";
  readonly brief: string;
  readonly tips: string;
  readonly assets_presentation: string[];
  readonly premium: boolean;
  readonly starter_code_path_file: string;
  readonly starter_figma_path_file: string;
  readonly createdById: string;
};

export type ChallengeSolution = {
  readonly id: number;
  readonly title: string;
  readonly repository_url: string;
  readonly live_preview_url: string;
  readonly stacks: string[];
  readonly solution_retrospective: string;
  readonly userId: string;
  readonly challengeId: number;
};
