import type { Challenge } from "@/core/domain/entities/challenge.entity";
import type {
  ChallengeDTO,
  CreateChallengeDTO,
} from "@/core/infrastructure/dto/challenge.dto";

export class ChallengeTransformer {
  static toDomain(createChallengeDTO: CreateChallengeDTO): Challenge {
    return {
      ...createChallengeDTO,
      id: 0,
    };
  }

  static toEntity(challenge: Challenge): ChallengeDTO {
    return challenge;
  }
}
