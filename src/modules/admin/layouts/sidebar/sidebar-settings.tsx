import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const SidebarSettings = () => {
  return (
    <li className="mt-auto">
      <a
        href="#"
        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
      >
        <Cog6ToothIcon
          className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
          aria-hidden="true"
        />
        Settings
      </a>
    </li>
  );
};
