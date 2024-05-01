"use client";
import { useMobileMenu } from "@/core/views/stores/use-mobile-menu";
import { Dialog } from "@headlessui/react";
import { Logo } from "@/core/views/components/ui/logo";
import { NavigationMobile } from "@/core/views/components/layouts/navigation-mobile";
import { HamburgerButtonClose } from "@/core/views/components/layouts/hamburger-button-close";
import { AuthNavigation } from "@/core/views/components/layouts/auth-navigation";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const MobileMenu = ({ session }: Props) => {
  const { isOpen, close } = useMobileMenu();

  return (
    <Dialog as="div" className="lg:hidden" open={isOpen} onClose={close}>
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Logo />
          <HamburgerButtonClose />
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <NavigationMobile />
            <div className="py-6">
              <AuthNavigation session={session} />
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
