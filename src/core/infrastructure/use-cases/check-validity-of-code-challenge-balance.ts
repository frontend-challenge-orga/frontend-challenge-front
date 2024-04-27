import { creditService } from "@/core/domain/services/token.service";

export function checkValidityOfCodeChallengeBalance(balance: number) {
  if (!creditService.checkValidityOfChallengeCreditBalance(balance)) {
    return {
      message:
        "You don't have enough credit to download the code challenge file",
      status: "error",
    };
  }
}
