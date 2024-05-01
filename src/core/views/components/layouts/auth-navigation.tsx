"use client";
import { Fragment } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/core/views/components/ui/button";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const AuthNavigation = ({ session }: Props) => {
  return (
    <Fragment>
      {session ? (
        <Button onClick={() => signOut()}>
          Log out <span aria-hidden="true">&rarr;</span>
        </Button>
      ) : (
        <Button onClick={() => signIn()}>
          Log in <span aria-hidden="true">&rarr;</span>
        </Button>
      )}
    </Fragment>
  );
};
