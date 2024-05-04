import { db } from "@/config/server/db";
import type { IUserChallengeRepository } from "@/core/domain/repositories/user.challenge.repository";

export const userChallengeRepository: IUserChallengeRepository = {
  getStartedChallenge(userId: string, challengeId: string) {
    return db.userChallenge.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
    });
  },

  getStartedChallengeBySlug(userId: string, challengeSlug: string) {
    return db.userChallenge.findFirst({
      where: {
        userId,
        challenge: {
          slug: challengeSlug,
        },
      },
    });
  },

  startChallenge: async (userId: string, challengeId: string) => {
    return db.userChallenge.create({
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
  },

  unlockFigmaFile: async (userId: string, challengeId: string) => {
    return db.userChallenge.update({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
      data: {
        figma_file_unlocked: true,
      },
    });
  },

  hasUserStartedChallenge: async (userId: string, challengeId: string): Promise<boolean> => {
    const userChallenge = await db.userChallenge.findFirst({
      where: {
        userId,
        challengeId,
      },
    });

    return !!userChallenge;
  },
};
