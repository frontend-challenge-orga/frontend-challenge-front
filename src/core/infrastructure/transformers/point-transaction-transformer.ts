import type { PointTransactionDTO } from "@/core/infrastructure/dto/point.transaction.dto";
import type { PointTransaction } from "@/core/domain/entities/point.transaction.entity";

export class PointTransactionTransformer {
  static toDomain(pointTransactionDTO: PointTransactionDTO): PointTransaction {
    return {
      ...pointTransactionDTO,
    };
  }

  static toEntity(pointTransaction: PointTransaction): PointTransactionDTO {
    return pointTransaction;
  }
}
