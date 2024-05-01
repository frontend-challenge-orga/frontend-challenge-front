import { creditService } from "@/core/infrastructure/services/credit.service";
import { ServerActionError } from "@/config/libs/next-safe-action";
import { ACTION_ERROR } from "@/config/constants";

export async function deductDesignCredits(
  userId: string,
  userCreditDesignAmount: number,
) {
  if (userCreditDesignAmount < 1) {
    throw new ServerActionError(ACTION_ERROR.INSUFFICIENT_DESIGN_CREDITS);
  }

  await creditService.subtractDesignCredits(userId, 1);
}
