import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSidebar } from "@/framework/modules/admin/stores/useSidebar";

export const SidebarHamburger = () => {
  const { open } = useSidebar();
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      onClick={open}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};
