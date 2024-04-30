import type { PointTransaction } from "@/core/domain/entities/point.transaction.entity";

export interface IPointTransactionRepository {
  save: (data: PointTransaction) => Promise<PointTransaction>;
}
