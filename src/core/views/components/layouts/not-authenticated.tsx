import { LoginButton } from "@/core/views/components/ui/login-button";
import { Typography } from "@/core/views/components/typography";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const NotAuthenticated = ({ session }: Props) => {
  return (
    <div className={"flex flex-col gap-4"}>
      <Typography.Title as={"h1"}>
        Oops! You&aposre not logged in.
      </Typography.Title>
      <Typography.Paragraph>
        Please log in to view this page.
      </Typography.Paragraph>
      <LoginButton session={session} />
    </div>
  );
};
