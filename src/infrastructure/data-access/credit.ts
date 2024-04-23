import { db } from "@/config/server/db";
import { ICreditRepository } from "@/domain/repositories/credit.repository";
import type { Credit } from "@/domain/models/credit.model";

export class CreditRepository implements ICreditRepository {
  async addCredits(userId: string): Promise<void> {
    try {
      await db.credit.update({
        where: { userId: userId },
        data: {
          challenge_amount: {
            increment: 2,
          },
          design_amount: {
            increment: 5,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCredit(userId: string): Promise<Credit | null> {
    const credit = await db.credit.findUnique({
      where: { userId: userId },
    });

    return credit ?? null;
  }
}

const creditRepository = new CreditRepository();
export default creditRepository;
