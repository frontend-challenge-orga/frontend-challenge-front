"use client";

import React, { Fragment } from "react";
import { AuthDialog } from "@/core/views/modules/auth/components/auth-dialog";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export const SessionGuard = ({ session, children }: Props) => {
  return session ? <Fragment>{children}</Fragment> : <AuthDialog session={session}>{children}</AuthDialog>;
};
