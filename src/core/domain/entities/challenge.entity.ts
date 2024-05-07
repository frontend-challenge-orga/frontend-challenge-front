export type Challenge = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly language: Language;
  readonly difficulty: Difficulty;
  readonly points: number;
  readonly brief: string;
  readonly tips: string;
  readonly assets_presentation: string[];
  readonly premium: boolean;
  readonly starter_code_path_file: string;
  readonly starter_figma_path_file: string;
  readonly createdById: string;
};

export type Difficulty = "NEWBIE" | "JUNIOR" | "INTERMEDIATE" | "ADVANCED" | "GURU";

export type Language = "HTML_CSS" | "JS" | "API";

export type Filter = {
  readonly type?: string[];
  readonly difficulty?: string[];
  readonly language?: string[];
};
