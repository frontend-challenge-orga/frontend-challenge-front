import { db } from "@/config/server/db";
import type { CreateChallengeType } from "@/backend/types/challenge.type";

class ChallengeService {
  async getChallenges() {
    try {
      return await db.challenge.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getChallengeById(id: number) {
    try {
      return await db.challenge.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getChallengesCount() {
    try {
      return await db.challenge.count();
    } catch (error) {
      console.log(error);
    }
  }

  async createChallenge(data: CreateChallengeType) {
    try {
      await db.challenge.create({ data });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }

  async updateChallenge(id: number, data: CreateChallengeType) {
    try {
      await db.challenge.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const challengeService = new ChallengeService();
export default challengeService;
