import type { Credit } from "@/domain/models/credit.model";

export interface ICreditRepository {
  addCredits(userId: string): Promise<void>;
  getCredit(userId: string): Promise<Credit | null>;
}
