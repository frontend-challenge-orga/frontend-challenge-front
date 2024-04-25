import { db } from "@/config/server/db";
import type { CreateChallengeType } from "@/infrastructure/data-access/types/challenge.type";
import type { IChallengeRepository } from "@/domain/interfaces/repositories/challenge.repository";
import type { Challenge } from "@/domain/models/challenge.model";

export class ChallengeRepository implements IChallengeRepository {
  async getChallenges(): Promise<Challenge[] | undefined> {
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

  async getChallengeById(id: number): Promise<Challenge | undefined> {
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

  async getChallengesCount(): Promise<number | undefined> {
    try {
      return await db.challenge.count();
    } catch (error) {
      console.log(error);
    }
  }

  async createChallenge(data: CreateChallengeType): Promise<void> {
    try {
      await db.challenge.create({ data });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }

  async updateChallenge(id: number, data: CreateChallengeType): Promise<void> {
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

const challengeRepository = new ChallengeRepository();
export default challengeRepository;
