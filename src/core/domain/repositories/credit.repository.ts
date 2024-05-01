import type { Credit } from "@/core/domain/entities/credit.entity.ts";

export interface ICreditRepository {
  show(userId: string): Promise<Credit>;
  store(userId: string): Promise<Credit>;
  subtractChallengeCredits(userId: string, amount: number): Promise<Credit>;
  subtractDesignCredits(userId: string, amount: number): Promise<Credit>;
}
