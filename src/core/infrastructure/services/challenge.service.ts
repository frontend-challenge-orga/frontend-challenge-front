import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import { ChallengeTransformer } from "@/core/infrastructure/transformers/challenge-transformer";
import type { Challenge } from "@/core/domain/entities/challenge.entity";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { FileType } from "@/config/types";
import { FileType } from "@/config/constants";

export interface IChallengeService {
  getChallenges(): Promise<ChallengeDTO[]>;
  getChallengeById(id: string): Promise<ChallengeDTO | null>;
  getChallengeBySlug(slug: string): Promise<ChallengeDTO>;
  /*  getFileLink(challengeId: string, fileType: FileType): Promise<string>;*/
  getStarterFigmaFileLink(challengeId: string): Promise<string | null>;
  getStarterCodeFileLink(challengeId: string): Promise<string | null>;
  createChallenge(data: Challenge): Promise<ChallengeDTO>;
  updateChallenge(id: string, data: Challenge): Promise<ChallengeDTO | undefined>;
  removeChallenge(id: string): Promise<void>;
  isPremiumChallenge(challengeId: string): Promise<boolean | null>;
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
      if (!challenge) return null;

      return ChallengeTransformer.toEntity(challenge);
    });
  },

  getChallengeBySlug: async (slug: string) => {
    return challengeRepository.showBySlug(slug).then((challenge) => {
      return ChallengeTransformer.toEntity(challenge);
    });
  },

  /* getFileLink: async (challengeId: string, fileType) => {
    return challengeRepository.show(challengeId).then((challenge) => {
      return fileType === FileType.FIGMA ? challenge.starter_figma_path_file : challenge.starter_code_path_file;
    });
  },*/

  getStarterCodeFileLink: async (challengeId: string) => {
    return challengeRepository.show(challengeId).then((challenge) => {
      return challenge?.starter_code_path_file ?? null;
    });
  },

  getStarterFigmaFileLink: async (challengeId: string) => {
    return challengeRepository.show(challengeId).then((challenge) => {
      return challenge?.starter_figma_path_file ?? null;
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
      return challenge?.premium ?? null;
    });
  },
};
