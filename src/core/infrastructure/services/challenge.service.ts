import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import { ChallengeTransformer } from "@/core/infrastructure/transformers/challenge-transformer";
import type { Challenge } from "@/core/domain/entities/challenge.entity";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

export interface IChallengeService {
  getChallenges(): Promise<ChallengeDTO[]>;
  getChallengeById(id: string): Promise<ChallengeDTO>;
  getChallengeBySlug(slug: string): Promise<ChallengeDTO>;
  createChallenge(data: Challenge): Promise<ChallengeDTO>;
  updateChallenge(id: string, data: Challenge): Promise<ChallengeDTO | undefined>;
  removeChallenge(id: string): Promise<void>;
  isPremiumChallenge(challengeId: string): Promise<boolean>;
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

  updateChallenge: async (id: string, data: Challenge) => {
    return challengeRepository.update(id, data).then((challenge) => {
      return ChallengeTransformer.toEntity(challenge!);
    });
  },

  removeChallenge: async (id: string) => {
    return challengeRepository.remove(id);
  },

  isPremiumChallenge: async (challengeId: string) => {
    return challengeRepository.show(challengeId).then((challenge) => {
      return challenge.premium;
    });
  },
};
