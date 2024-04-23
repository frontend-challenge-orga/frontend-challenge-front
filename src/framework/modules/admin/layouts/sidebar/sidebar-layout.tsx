import type { PropsWithChildren } from "react";

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
      {children}
    </div>
  );
};
