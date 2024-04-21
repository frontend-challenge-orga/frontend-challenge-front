import type { PropsWithChildren } from "react";
import { Typography } from "@/components/typography";

export const Heading = ({ children }: PropsWithChildren) => {
  return <Typography.Title as={"h1"}>{children}</Typography.Title>;
};