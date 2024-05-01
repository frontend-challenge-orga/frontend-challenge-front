import { getServerAuthSession } from "@/config/server/auth";
import { Logo } from "@/core/views/components/ui/logo";
import { HamburgerButton } from "@/core/views/components/layouts/hamburger-button";
import { Navigation } from "@/core/views/components/layouts/navigation";
import { AuthNavigation } from "@/core/views/components/layouts/auth-navigation";
import { MobileMenu } from "@/core/views/components/layouts/mobile-menu";

export const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        <HamburgerButton />

        <Navigation />
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <AuthNavigation session={session} />
        </div>
      </nav>
      <MobileMenu session={session} />
    </header>
  );
};
