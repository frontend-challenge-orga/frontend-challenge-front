import { db } from "@/config/server/db";
import type { ICreditRepository } from "@/core/domain/repositories/credit.repository";

export const creditRepository: ICreditRepository = {
  show: async (userId: string) => {
    return db.credit.findUniqueOrThrow({
      where: {
        userId,
      },
    });
  },

  store: async (userId: string) => {
    return db.credit.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        challenge_amount: 2,
        design_amount: 5,
      },
      update: {
        challenge_amount: {
          increment: 2,
        },
        design_amount: {
          increment: 5,
        },
      },
    });
  },

  subtractChallengeCredits: async (userId: string, amount: number) => {
    return db.credit.update({
      where: {
        userId,
      },
      data: {
        challenge_amount: {
          decrement: amount,
        },
      },
    });
  },

  subtractDesignCredits: async (userId: string, amount: number) => {
    return db.credit.update({
      where: {
        userId,
      },
      data: {
        design_amount: {
          decrement: amount,
        },
      },
    });
  },
};
