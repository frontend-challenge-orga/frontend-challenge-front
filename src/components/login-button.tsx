"use client";

import { signIn } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const LoginButton = ({ session }: Props) => {
  if (session) return null;

  return <button onClick={() => signIn()}>Login</button>;
};
