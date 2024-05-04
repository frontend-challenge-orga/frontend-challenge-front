import type { PropsWithChildren } from "react";

export const ChallengesGrid = ({ children }: PropsWithChildren) => {
  return <section className={"grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3"}>{children}</section>;
};
