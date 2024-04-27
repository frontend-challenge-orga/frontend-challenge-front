import { db } from "@/config/server/db";
import type { IUserChallengeRepository } from "@/core/domain/repositories/challenge.repository";

export const userChallengeRepository: IUserChallengeRepository = {
  startChallenge: async (userId: string, challengeId: number) => {
    try {
      await db.userChallenge.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          challenge: {
            connect: {
              id: challengeId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Error starting challenge");
    }
  },

  hasUserStartedChallenge: async (
    userId: string,
    challengeId: number,
  ): Promise<boolean> => {
    try {
      const userChallenge = await db.userChallenge.findFirst({
        where: {
          userId,
          challengeId,
        },
      });
      return !!userChallenge;
    } catch (error) {
      throw new Error("Error checking if user has started challenge");
    }
  },
};
