import type { PropsWithChildren } from "react";

export const ChallengeCardLayout = ({ children }: PropsWithChildren) => {
  return <article className={"col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"}>{children}</article>;
};
