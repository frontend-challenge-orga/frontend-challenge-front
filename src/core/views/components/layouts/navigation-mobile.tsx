import Link from "next/link";
import { NAVIGATION } from "@/config/constants";

export const NavigationMobile = () => {
  return (
    <div className="space-y-2 py-6">
      {NAVIGATION.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
