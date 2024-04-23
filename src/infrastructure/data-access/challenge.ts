import { db } from "@/config/server/db";
import type { CreateChallengeType } from "@/infrastructure/data-access/types/challenge.type";

export async function getChallenges() {
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

export async function getChallengeById(id: number) {
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

export async function getChallengesCount() {
  try {
    return await db.challenge.count();
  } catch (error) {
    console.log(error);
  }
}

export async function createChallenge(data: CreateChallengeType) {
  try {
    await db.challenge.create({ data });
  } catch (error) {
    console.log(error);
  }
  console.log(data);
}

export async function updateChallenge(id: number, data: CreateChallengeType) {
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
