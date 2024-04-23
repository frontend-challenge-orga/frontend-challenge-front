import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "@/framework/admin/stores/useSidebar";

export const SidebarClose = () => {
  const { close } = useSidebar();
  return (
    <button type="button" className="-m-2.5 p-2.5" onClick={close}>
      <span className="sr-only">Close sidebar</span>
      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
    </button>
  );
};
