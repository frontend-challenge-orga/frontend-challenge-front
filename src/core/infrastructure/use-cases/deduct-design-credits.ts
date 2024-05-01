import { creditRepository } from "@/core/infrastructure/repositories/credit.repository";
import { ACTION_ERROR } from "@/config/constants";
import { ServerActionError } from "@/config/libs/next-safe-action";

export async function deductDesignCredits(
  userId: string,
  userCreditDesignAmount: number,
) {
  if (userCreditDesignAmount < 1) {
    throw new ServerActionError(ACTION_ERROR.INSUFFICIENT_DESIGN_CREDITS);
  }

  await creditRepository.subtractDesignCredits(userId, 1);
}
