import { pointTransactionRepository } from "@/core/infrastructure/repositories/point.transaction.repository";
import { PointTransactionTransformer } from "@/core/infrastructure/transformers/point-transaction-transformer";
import type { PointTransaction } from "@/core/domain/entities/point.transaction.entity";
import type { PointTransactionDTO } from "@/core/infrastructure/dto/point.transaction.dto";

interface IPointTransactionService {
  createPointTransaction: (
    data: PointTransaction,
  ) => Promise<PointTransactionDTO>;
}

export const pointTransactionService: IPointTransactionService = {
  createPointTransaction: async (data) => {
    return pointTransactionRepository.save(data).then((pointTransaction) => {
      return PointTransactionTransformer.toEntity(pointTransaction);
    });
  },
};
