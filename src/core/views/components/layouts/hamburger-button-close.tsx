import { useMobileMenu } from "@/core/views/stores/use-mobile-menu";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const HamburgerButtonClose = () => {
  const { toggle } = useMobileMenu();
  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        className="-m-2.5 rounded-md p-2.5 text-gray-700"
        onClick={toggle}
      >
        <span className="sr-only">Close menu</span>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};
