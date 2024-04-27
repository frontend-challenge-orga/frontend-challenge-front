import { Tailwind } from "@react-email/components";
import type { PropsWithChildren } from "react";

export const MailingTailwindProvider = ({ children }: PropsWithChildren) => {
  return <Tailwind>{children}</Tailwind>;
};
