import type { PropsWithChildren } from "react";

export const Large = ({ children }: PropsWithChildren) => {
  return <div className="text-lg font-semibold">{children}</div>;
};
