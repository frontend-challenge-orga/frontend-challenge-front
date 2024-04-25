import { db } from "@/config/server/db";
import type { ICreditRepository } from "@/domain/interfaces/repositories/credit.repository";
import type { Credit } from "@/domain/models/credit.model";

export class CreditRepository implements ICreditRepository {
  async addCredits(userId: string): Promise<void> {
    try {
      await db.credit.upsert({
        where: { userId: userId },
        create: {
          userId: userId,
          challenge_amount: 2,
          design_amount: 5,
        },
        update: {
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
