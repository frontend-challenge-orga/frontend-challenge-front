import type { Credit } from "@/core/domain/entities/credit.entity.ts";

export interface ICreditRepository {
  store(userId: string): Promise<Credit>;
  show(userId: string): Promise<Credit | undefined>;
  subtractChallengeCredits(userId: string, amount: number): Promise<Credit>;
  subtractDesignCredits(userId: string, amount: number): Promise<Credit>;
}
