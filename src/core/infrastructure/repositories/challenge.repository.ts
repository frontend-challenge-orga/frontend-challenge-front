import { db } from "@/config/server/db";
import type { IChallengeRepository } from "@/core/domain/repositories/challenge.repository";
import type { CreateChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

export const challengeRepository: IChallengeRepository = {
  index: async () => {
    try {
      return await db.challenge.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  show: async (id: number) => {
    try {
      return await db.challenge.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  showBySlug: async (slug: string) => {
    try {
      return await db.challenge.findUniqueOrThrow({
        where: {
          slug,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  count: async () => {
    try {
      return await db.challenge.count();
    } catch (error) {
      console.error(error);
    }
  },

  create: async (data) => {
    try {
      return await db.challenge.create({ data });
    } catch (error) {
      throw new Error("Failed to create challenge");
    }
  },

  update: async (id, data) => {
    try {
      return await db.challenge.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
