import Link from "next/link";
import { NAVIGATION } from "@/config/constants";

export const Navigation = () => {
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {NAVIGATION.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
