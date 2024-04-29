import type { PropsWithChildren } from "react";

export const Error = ({ children }: PropsWithChildren) => {
  return (
    <p className="leading-7 text-red-500 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
};
