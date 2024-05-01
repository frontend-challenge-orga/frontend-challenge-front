import * as React from "react";
import Link from "next/link";
import { Button, type ButtonProps } from "@/core/views/components/ui/button";

type Props = {
  href: string;
  children: React.ReactNode;
} & ButtonProps;

export const ButtonLink = ({ href, children, ...props }: Props) => {
  return (
    <Button type="button" {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
