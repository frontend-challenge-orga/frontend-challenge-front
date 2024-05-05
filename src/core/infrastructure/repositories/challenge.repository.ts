import { db } from "@/config/server/db";
import { ChallengeTransformer } from "@/core/infrastructure/transformers/challenge-transformer";
import type { IChallengeRepository } from "@/core/domain/repositories/challenge.repository";

export const challengeRepository: IChallengeRepository = {
  index: async () => {
    return db.challenge.findMany({
      orderBy: {
        id: "desc",
      },

      include: {
        challengeSolutions: {
          select: {
            id: true,
          },
        },
      },
    });
  },

  show: async (id: string) => {
    return db.challenge.findUniqueOrThrow({
      where: {
        id,
      },
    });
  },

  showBySlug: async (slug: string) => {
    return db.challenge.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  },

  count: async () => {
    return db.challenge.count();
  },

  create: async (data) => {
    const challenge = ChallengeTransformer.toEntity(data);
    return db.challenge.create({ data: challenge });
  },

  update: async (id, data) => {
    return db.challenge.update({
      where: {
        id,
      },
      data,
    });
  },

  remove: async (id: string) => {
    await db.challenge.delete({
      where: {
        id,
      },
    });
  },
};
