import React from "react";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(({ children, className, ...props }, ref) => {
  return (
    <p className={className} ref={ref} {...props}>
      {children}
    </p>
  );
});

Paragraph.displayName = "Paragraph";

export { Paragraph };
