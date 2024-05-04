import { db } from "@/config/server/db";
import type { IUserRepository } from "@/core/domain/repositories/user.repository";

export const userRepository: IUserRepository = {
  index: async () => {
    return db.user.findMany({
      orderBy: {
        id: "desc",
      },
    });
  },

  show: async (id: string) => {
    return db.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  },

  update: async (user) => {
    return db.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  },

  updatePoints: async (id: string, points: number) => {
    return db.user.update({
      where: {
        id,
      },
      data: {
        points,
      },
    });
  },

  delete: async (id: string) => {
    void db.user.delete({
      where: {
        id,
      },
    });
  },

  getLoggedUser: async (id: string) => {
    const session = await db.session.findFirst({
      where: {
        userId: id,
      },
    });

    if (session === null) return false;
    else return true;
  },
};
