import { db } from "@/config/server/db";
import type { CreateChallengeType } from "@/backend/types/challenge.type";

class ChallengeService {
  async createChallenge(data: CreateChallengeType) {
    try {
      await db.challenge.create({ data })
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }
}

export const challengeService = new ChallengeService();
export default challengeService;
