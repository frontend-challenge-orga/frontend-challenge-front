import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/config/server/auth";
import { URL, ROLE, PROTECTED_ROUTE_ERROR } from "@/config/constants";
import type { PropsWithChildren } from "react";

import { SidebarMobile } from "@/modules/admin/layouts/sidebar/sidebar-mobile";
import { SidebarDesktop } from "@/modules/admin/layouts/sidebar/sidebar-desktop";
import { Header } from "@/modules/admin/layouts/header";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (
    session?.user.role !== ROLE.ADMIN &&
    session?.user.role !== ROLE.COLLABORATOR
  ) {
    console.log(PROTECTED_ROUTE_ERROR.ADMIN);

    redirect(URL.HOME);
  }
  return (
    <div>
      <SidebarMobile />
      <SidebarDesktop />
      <div className="lg:pl-72">
        <Header />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
