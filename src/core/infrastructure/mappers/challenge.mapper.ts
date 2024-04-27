import type { Challenge } from "@/core/domain/entities/challenge.entity";
import type { CreateChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

export class ChallengeMapper {
  static toDomain(createChallengeDTO: CreateChallengeDTO): Challenge {
    return {
      ...createChallengeDTO,
      id: 0, // This should be replaced by the actual logic to generate an id
      createdAt: new Date(), // This should be replaced by the actual logic to generate a date
      updatedAt: new Date(), // This should be replaced by the actual logic to generate a date
    };
  }

  static toInfrastructure(challenge: Challenge): CreateChallengeDTO {
    return {
      ...challenge,
    };
  }
}
