import React from "react";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export const NodePreventDefault = ({ session, setOpen, children }: Props) => {
  return (
    <div
      onClick={() => setOpen(true)}
      style={{ pointerEvents: session ? "auto" : "none" }}
    >
      {children}
    </div>
  );
};
