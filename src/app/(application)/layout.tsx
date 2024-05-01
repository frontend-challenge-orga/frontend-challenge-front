import type { PropsWithChildren } from "react";
import { Header } from "@/core/views/components/layouts/header";

export default function ApplicationLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
