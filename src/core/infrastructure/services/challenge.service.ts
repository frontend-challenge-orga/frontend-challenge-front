import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import { ChallengeTransformer } from "@/core/infrastructure/transformers/challenge-transformer";
import type { Challenge } from "@/core/domain/entities/challenge.entity";

interface IChallengeService {
  getChallenges(): Promise<Challenge[]>;
  getChallengeById(id: number): Promise<Challenge>;
  getChallengeBySlug(slug: string): Promise<Challenge>;
}

class ChallengeService implements IChallengeService {
  async getChallenges() {
    return challengeRepository.index().then((challenges) => {
      return challenges?.map((challenge: Challenge) => {
        return ChallengeTransformer.toEntity(challenge);
      });
    });
  }

  async getChallengeById(id: number) {
    return challengeRepository.show(id).then((challenge) => {
      return ChallengeTransformer.toEntity(challenge);
    });
  }

  async getChallengeBySlug(slug: string) {
    return challengeRepository.showBySlug(slug).then((challenge) => {
      return ChallengeTransformer.toEntity(challenge);
    });
  }
}

const challengeService = new ChallengeService();
export { challengeService };
