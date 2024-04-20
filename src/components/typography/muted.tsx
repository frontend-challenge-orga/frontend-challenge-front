import type { PropsWithChildren } from "react";

export const Muted = ({ children }: PropsWithChildren) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};
