import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/views/components/ui/dialog";
import { LoginButton } from "@/core/views/components/ui/login-button";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export const AuthDialog = ({ session, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className={session ? "pointer-events-auto" : "pointer-events-none"}>
          {!session ? <span>Login with github</span> : children}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Oops! 😬</DialogTitle>
          <DialogDescription>You need to be logged in before you can do that.</DialogDescription>
        </DialogHeader>
        <LoginButton session={session} />
      </DialogContent>
    </Dialog>
  );
};
