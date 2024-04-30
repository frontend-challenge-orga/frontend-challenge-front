import { db } from "@/config/server/db";
import type { IPointTransactionRepository } from "@/core/domain/repositories/point.transaction.repository";

export const pointTransactionRepository: IPointTransactionRepository = {
  save: async (data) => {
    return db.pointTransaction.create({ data });
  },
};
