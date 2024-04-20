"use client";

import { SidebarLayout } from "@/modules/admin/layouts/sidebar/sidebar-layout";
import { SidebarLogo } from "@/modules/admin/layouts/sidebar/sidebar-logo";
import { SidebarNavigation } from "@/modules/admin/layouts/sidebar/sidebar-navigation";

export const SidebarDesktop = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <SidebarLayout>
        <SidebarLogo />
        <SidebarNavigation />
      </SidebarLayout>
    </div>
  );
};
