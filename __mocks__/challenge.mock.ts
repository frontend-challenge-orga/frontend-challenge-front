import { faker } from "@faker-js/faker/locale/en";
import type { Difficulty, Language } from "@/core/domain/entities/challenge.entity";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

export class ChallengeMock implements ChallengeDTO {
  id: string;
  name: string;
  slug: string;
  description: string;
  language: Language;
  difficulty: Difficulty;
  points: number;
  brief: string;
  tips: string;
  assets_presentation: string[];
  premium: boolean;
  starter_code_path_file: string;
  starter_figma_path_file: string;
  createdById: string;

  constructor() {
    this.id = faker.string.uuid();
    this.name = "Challenge Name";
    this.slug = "challenge-name";
    this.description = "Challenge Description";
    this.language = "HTML_CSS";
    this.difficulty = "NEWBIE";
    this.points = 1;
    this.brief = "Challenge Brief";
    this.tips = "Challenge Tips";
    this.assets_presentation = ["/path", "/path"];
    this.premium = true;
    this.starter_code_path_file = "path/to/file";
    this.starter_figma_path_file = "path/to/file";
    this.createdById = "user-id";
  }
}
