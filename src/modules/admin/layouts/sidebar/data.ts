import { FolderIcon, HomeIcon } from "@heroicons/react/24/outline";
import { URL } from "@/config/constants";

export const navigation = [
  { name: "Dashboard", href: URL.ADMIN, icon: HomeIcon, current: true },
  {
    name: "Challenges",
    href: URL.ADMIN_CHALLENGES,
    icon: FolderIcon,
    current: false,
  },
];

export const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
