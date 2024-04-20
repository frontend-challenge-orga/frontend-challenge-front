import { BellIcon } from "@heroicons/react/24/outline";

export const HeaderNotification = () => {
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};
