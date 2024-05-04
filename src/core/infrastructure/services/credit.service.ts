import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";
import { CreditTransformer } from "@/core/infrastructure/transformers/credit-transformer";
import type { CreditDTO } from "@/core/infrastructure/dto/credit.dto";

interface ICreditRepository {
  getCreditByUserId(userId: string): Promise<CreditDTO>;
  addCredit(userId: string): Promise<CreditDTO>;
  subtractChallengeCredits(userId: string, amount: number): Promise<CreditDTO>;
  subtractDesignCredits(userId: string, amount: number): Promise<CreditDTO>;
  userChallengeCredits(userId: string): Promise<number>;
  userDesignCredits(userId: string): Promise<number>;
}

export const creditService: ICreditRepository = {
  getCreditByUserId: async (userId: string) => {
    return creditRepository.show(userId).then((credit) => {
      return CreditTransformer.toEntity(credit);
    });
  },

  addCredit: async (userId: string) => {
    return creditRepository.store(userId).then((credit) => {
      return CreditTransformer.toEntity(credit);
    });
  },

  subtractChallengeCredits: async (userId: string, amount: number) => {
    return creditRepository.subtractChallengeCredits(userId, amount).then((credit) => {
      return CreditTransformer.toEntity(credit);
    });
  },

  subtractDesignCredits: async (userId: string, amount: number) => {
    return creditRepository.subtractDesignCredits(userId, amount).then((credit) => {
      return CreditTransformer.toEntity(credit);
    });
  },

  userChallengeCredits: async (userId: string) => {
    return creditRepository.show(userId).then((credit) => {
      return CreditTransformer.toEntity(credit).challenge_amount;
    });
  },

  userDesignCredits: async (userId: string) => {
    return creditRepository.show(userId).then((credit) => {
      return CreditTransformer.toEntity(credit).design_amount;
    });
  },
};
