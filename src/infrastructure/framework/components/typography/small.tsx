import type { PropsWithChildren } from "react";

export const Small = ({ children }: PropsWithChildren) => {
  return <small className="text-sm font-medium leading-none">{children}</small>;
};
