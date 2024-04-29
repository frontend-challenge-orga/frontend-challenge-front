import { db } from "@/config/server/db";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import type { IChallengeSolutionRepository } from "@/core/domain/repositories/challenge.repository";

export const challengeSolutionRepository: IChallengeSolutionRepository = {
  create: async (data) => {
    const challengeSolution = ChallengeSolutionTransformer.toEntity(data);
    return db.challengeSolution.create({ data: challengeSolution });
  },
};
