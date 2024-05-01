import type { Challenge } from "@/core/domain/entities/challenge.entity";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

export class ChallengeTransformer {
  static toDomain(createChallengeDTO: ChallengeDTO): Challenge {
    return {
      ...createChallengeDTO,
    };
  }

  static toEntity(challenge: Challenge): ChallengeDTO {
    return challenge;
  }
}
