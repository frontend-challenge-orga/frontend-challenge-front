"use client";

import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const LogoutButton = ({ session }: Props) => {
  if (!session) return null;

  return <button onClick={() => signOut()}>Logout</button>;
};
