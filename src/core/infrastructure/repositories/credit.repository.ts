import { db } from "@/config/server/db";
import type { ICreditRepository } from "@/core/domain/repositories/credit.repository";

export const creditRepository: ICreditRepository = {
  show: async (userId: string) => {
    try {
      return await db.credit.findUniqueOrThrow({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  store: async (userId: string) => {
    try {
      await db.credit.upsert({
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
    } catch (error) {
      console.error(error);
    }
  },

  subtractChallengeCredits: async (userId: string, amount: number) => {
    try {
      await db.credit.update({
        where: {
          userId,
        },
        data: {
          challenge_amount: {
            decrement: amount,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  subtractDesignCredits: async (userId: string, amount: number) => {
    try {
      await db.credit.update({
        where: {
          userId,
        },
        data: {
          design_amount: {
            decrement: amount,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
};
