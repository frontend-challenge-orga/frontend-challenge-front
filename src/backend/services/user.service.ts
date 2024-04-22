import { db } from "@/config/server/db";

class UserService {
  async createSubscription(userId: string) {
    try {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          subscribed: true,
          subscribed_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateSubscription(userId: string) {
    try {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          subscribed: true,
          subscribed_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async cancelSubscription(userId: string) {
    try {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          subscribed: false,
          subscribed_at: null,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const userService = new UserService();
export default userService;
