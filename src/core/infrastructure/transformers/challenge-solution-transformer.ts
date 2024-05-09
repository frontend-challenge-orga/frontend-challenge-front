import type { ChallengeSolution, ChallengeSolutionSave } from "@/core/domain/entities/challenge.solution.entity";
import type { ChallengeSolutionDTO, ChallengeSolutionViewDTO } from "@/core/infrastructure/dto/challenge.solution.dto";

export class ChallengeSolutionTransformer {
  static toEntity(challengeSolution: ChallengeSolution): ChallengeSolutionDTO {
    return challengeSolution;
  }

  static toCreate(challengeSolution: ChallengeSolutionSave): ChallengeSolutionDTO {
    return {
      ...challengeSolution,
    };
  }

  static toView(challengeSolution: ChallengeSolution): ChallengeSolutionViewDTO {
    return {
      ...challengeSolution,
    };
  }
}
