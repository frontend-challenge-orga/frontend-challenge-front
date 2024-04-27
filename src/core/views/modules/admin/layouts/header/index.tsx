"use client";

import { SidebarHamburger } from "@/core/views/modules/admin/layouts/sidebar/sidebar-hamburger";
import { HeaderNotification } from "@/core/views/modules/admin/layouts/header/header-notification";
import { HeaderUserNavigation } from "@/core/views/modules/admin/layouts/header/header-user-navigation";

export const Header = async () => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <SidebarHamburger />

      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex w-full items-center justify-end gap-x-4 lg:gap-x-6">
          <HeaderNotification />
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          />
          <HeaderUserNavigation />
        </div>
      </div>
    </div>
  );
};
