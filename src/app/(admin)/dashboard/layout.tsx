import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/config/server/auth";
import { URL, ROLE, PROTECTED_ROUTE_ERROR } from "@/config/constants";
import { SessionProvider } from "@/framework/modules/auth/context/session-context";
import { SidebarMobile } from "@/framework/modules/admin/layouts/sidebar/sidebar-mobile";
import { SidebarDesktop } from "@/framework/modules/admin/layouts/sidebar/sidebar-desktop";
import { Header } from "@/framework/modules/admin/layouts/header";
import type { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (
    session?.user.role !== ROLE.ADMIN &&
    session?.user.role !== ROLE.COLLABORATOR
  ) {
    console.log(PROTECTED_ROUTE_ERROR.ADMIN);
    redirect(URL.LANDING);
  }

  return (
    <SessionProvider session={session}>
      <SidebarMobile />
      <SidebarDesktop />
      <div className="lg:pl-72">
        <Header />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
