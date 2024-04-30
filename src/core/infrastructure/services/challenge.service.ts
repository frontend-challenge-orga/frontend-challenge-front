import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import { ChallengeTransformer } from "@/core/infrastructure/transformers/challenge-transformer";
import type { Challenge } from "@/core/domain/entities/challenge.entity";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

interface IChallengeService {
  getChallenges(): Promise<ChallengeDTO[]>;
  getChallengeById(id: string): Promise<ChallengeDTO>;
  getChallengeBySlug(slug: string): Promise<ChallengeDTO>;
  createChallenge(data: Challenge): Promise<ChallengeDTO>;
  removeChallenge(id: string): Promise<void>;
}

export const challengeService: IChallengeService = {
  getChallenges: async () => {
    return challengeRepository.index().then((challenges) => {
      return challenges?.map((challenge: Challenge) => {
        return ChallengeTransformer.toEntity(challenge);
      });
    });
  },

  getChallengeById: async (id: string) => {
    return challengeRepository.show(id).then((challenge) => {
      return ChallengeTransformer.toEntity(challenge);
    });
  },

  getChallengeBySlug: async (slug: string) => {
    return challengeRepository.showBySlug(slug).then((challenge) => {
      return ChallengeTransformer.toEntity(challenge);
    });
  },

  createChallenge: async (data) => {
    return challengeRepository.create(data).then((challenge) => {
      return ChallengeTransformer.toEntity(challenge);
    });
  },

  removeChallenge: async (id: string) => {
    return challengeRepository.remove(id);
  },
};
