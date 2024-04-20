import type { PropsWithChildren } from "react";

export const Lead = ({ children }: PropsWithChildren) => {
  return <p className="text-xl text-muted-foreground">{children}</p>;
};
