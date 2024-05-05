"use client";

import { type PropsWithChildren, createContext, useContext } from "react";
import type { Session } from "next-auth";

interface SessionContext {
  session: Session | null;
}

type SessionProviderProps = PropsWithChildren<SessionContext>;

const SessionContext = createContext<SessionContext | undefined>(undefined);

export const SessionProvider = ({ session, children }: SessionProviderProps) => {
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
