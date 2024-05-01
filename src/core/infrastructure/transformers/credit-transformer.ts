import type { Credit } from "@/core/domain/entities/credit.entity";
import type { CreditDTO } from "@/core/infrastructure/dto/credit.dto";

export class CreditTransformer {
  static toDomain(createCreditDTO: CreditDTO): Credit {
    return {
      ...createCreditDTO,
    };
  }

  static toEntity(credit: Credit): CreditDTO {
    return credit;
  }
}
