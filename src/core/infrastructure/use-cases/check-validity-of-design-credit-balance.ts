import { creditService } from "@/core/domain/services/token.service";

export function checkValidityOfDesignCreditBalance(balance: number) {
  if (!creditService.checkValidityOfDesignCreditBalance(balance)) {
    return {
      message: "You don't have enough credit to download the design file",
      status: "error",
    };
  }
}
