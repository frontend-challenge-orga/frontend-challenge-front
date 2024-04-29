import type {
  ChallengeSolutionDTO,
  CreateChallengeSolutionDTO,
} from "@/core/infrastructure/dto/challenge.solution.dto";
import type { ChallengeSolution } from "@/core/domain/entities/challenge.entity";

export class ChallengeSolutionTransformer {
  static toDomain(
    CreateChallengeSolutionDTO: CreateChallengeSolutionDTO,
  ): ChallengeSolution {
    return {
      ...CreateChallengeSolutionDTO,
      id: 0,
    };
  }

  static toEntity(challengeSolution: ChallengeSolution): ChallengeSolutionDTO {
    return challengeSolution;
  }
}
