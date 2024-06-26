import type { PropsWithChildren } from "react";

export default function SolutionsLayout({ children }: PropsWithChildren) {
  return (
    <main className={"w-full mx-auto max-w-screen-xl justify-items-center items-center p-4 sm:p-8 md:p-12 lg:p-16"}>
      {children}
    </main>
  );
}
