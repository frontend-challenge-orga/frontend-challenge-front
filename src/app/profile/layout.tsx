import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/config/server/auth";
import { URL, PROTECTED_ROUTE_ERROR } from "@/config/constants";
import type { PropsWithChildren } from "react";

export default async function ProfileLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (!session) {
    console.log(PROTECTED_ROUTE_ERROR.PROFILE);

    redirect(URL.HOME);
  }

  return <div>{children}</div>;
}
