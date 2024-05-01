import type { PropsWithChildren } from "react";

export const Success = ({ children }: PropsWithChildren) => {
  return (
    <p className="leading-7 text-green-500 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
};
