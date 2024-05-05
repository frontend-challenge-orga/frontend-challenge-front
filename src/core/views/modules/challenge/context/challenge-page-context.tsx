"use client";

import { createContext, useContext, type PropsWithChildren } from "react";
import type { Session } from "next-auth";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

interface ChallengePageContext {
  session: Session | null;
  challenge: ChallengeDTO;
  userAlreadyStartedChallenge: boolean;
  isSubscribed: boolean;
}

type ChallengePageProviderProps = PropsWithChildren<ChallengePageContext>;

const ChallengePageContext = createContext<ChallengePageContext | undefined>(undefined);

export const ChallengePageProvider = ({
  session,
  challenge,
  userAlreadyStartedChallenge,
  isSubscribed,
  children,
}: ChallengePageProviderProps) => {
  return (
    <ChallengePageContext.Provider value={{ session, challenge, userAlreadyStartedChallenge, isSubscribed }}>
      {children}
    </ChallengePageContext.Provider>
  );
};

export const useChallengePage = () => {
  const context = useContext(ChallengePageContext);

  if (context === undefined) {
    throw new Error("useChallengePage must be used within a ChallengePageProvider");
  }
  return context;
};
