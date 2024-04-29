export type ChallengeDTO = {
  id: number;
  name: string;
  slug: string;
  description: string;
  language: "HTML_CSS" | "JS" | "API";
  difficulty: "NEWBIE" | "JUNIOR" | "INTERMEDIATE" | "ADVANCED" | "GURU";
  brief: string;
  tips: string;
  assets_presentation: string[];
  premium: boolean;
  starter_code_path_file: string;
  starter_figma_path_file: string;
  createdById: string;
};

export type CreateChallengeDTO = Omit<ChallengeDTO, "id">;
