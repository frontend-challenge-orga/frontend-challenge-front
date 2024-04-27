export const creditService = {
  checkValidityOfChallengeCreditBalance: (balance: number) => {
    return balance >= 1;
  },

  checkValidityOfDesignCreditBalance: (balance: number) => {
    return balance >= 1;
  },
};
