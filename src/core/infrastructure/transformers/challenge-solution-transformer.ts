import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";
import type { ChallengeSolution } from "@/core/domain/entities/challenge.solution.entity";

export class ChallengeSolutionTransformer {
  static toDomain(
    challengeSolutionDTO: ChallengeSolutionDTO,
  ): ChallengeSolution {
    return {
      ...challengeSolutionDTO,
    };
  }

  static toEntity(challengeSolution: ChallengeSolution): ChallengeSolutionDTO {
    return challengeSolution;
  }
}
