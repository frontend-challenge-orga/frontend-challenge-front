import { Fragment } from "react";
import Link from "next/link";
import { useSidebar } from "@/framework/admin/stores/useSidebar";
import { navigation } from "@/framework/admin/layouts/sidebar/data";
import { cn } from "@/config/utils";

export const GlobalNavigation = () => {
  const { close } = useSidebar();

  return (
    <Fragment>
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={close}
            className={cn(
              item.current
                ? "bg-indigo-700 text-white"
                : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
            )}
          >
            <item.icon
              className={cn(
                item.current
                  ? "text-white"
                  : "text-indigo-200 group-hover:text-white",
                "h-6 w-6 shrink-0",
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        </li>
      ))}
    </Fragment>
  );
};
