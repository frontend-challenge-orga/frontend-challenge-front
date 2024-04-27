import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const titleVariants = cva("scroll-m-20", {
  variants: {
    as: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    as: "h1",
  },
});

interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ as, children, className, ...props }, ref) => {
    const Tag = as;

    return (
      <Tag className={titleVariants({ as, className })} ref={ref} {...props}>
        {children}
      </Tag>
    );
  },
);

Title.displayName = "Title";

export { Title, titleVariants };
