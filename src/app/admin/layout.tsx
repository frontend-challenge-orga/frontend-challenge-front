import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/config/server/auth";
import { URL, ROLE, PROTECTED_ROUTE_ERROR } from "@/config/constants";
import type { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (
    session?.user.role !== ROLE.ADMIN &&
    session?.user.role !== ROLE.COLLABORATOR
  ) {
    console.log(PROTECTED_ROUTE_ERROR.ADMIN);

    redirect(URL.HOME);
  }
  return <div>{children}</div>;
}
