import * as React from "react";
import { Button } from "@/framework/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/framework/components/ui/button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPending: boolean;
  asChild?: boolean;
}

export const ButtonSubmit = ({
  isPending,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Button type="submit" {...props}>
      {isPending ? "Loading..." : children}
    </Button>
  );
};
