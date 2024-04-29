import { getServerAuthSession } from "@/config/server/auth";
import type { PropsWithChildren } from "react";

export default async function SolutionsLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (!session?.user.subscribed) {
    return <div>Subscribe to view solutions</div>;
  }

  return <div>{children}</div>;
}
