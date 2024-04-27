import type { Credit } from "@/core/domain/entities/credit.entity.ts";

export interface ICreditRepository {
  store(userId: string): Promise<void>;
  show(userId: string): Promise<Credit | undefined>;
  subtractChallengeCredits(userId: string, amount: number): Promise<void>;
  subtractDesignCredits(userId: string, amount: number): Promise<void>;
}
