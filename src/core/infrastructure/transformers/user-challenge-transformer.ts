import type { UserChallengeDTO } from "@/core/infrastructure/dto/user.challenge.dto";
import type { UserChallenge } from "@/core/domain/entities/user.challenge.entity";

export class UserChallengeTransformer {
  static toDomain(userChallengeDTO: UserChallengeDTO): UserChallenge {
    return {
      ...userChallengeDTO,
    };
  }

  static toEntity(userChallenge: UserChallenge): UserChallengeDTO {
    return userChallenge;
  }
}
