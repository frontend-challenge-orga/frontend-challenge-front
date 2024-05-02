import { ButtonLink } from "@/core/views/components/ui/button-link";
import { Typography } from "@/core/views/components/typography";
import { URL } from "@/config/constants";

type Props = {
  slug: string;
};

export const ProtectedChallengeHub = ({ slug }: Props) => {
  return (
    <div className={"flex flex-col gap-4"}>
      <Typography.Title as={"h1"}>
        Looks like you haven&apost started this challenge yet
      </Typography.Title>

      <Typography.Paragraph>
        You need to start this challenge to unlock access to the Challenge Hub.
      </Typography.Paragraph>

      <ButtonLink href={`${URL.CHALLENGES}/${slug}`}>
        Visit challenge page
      </ButtonLink>
    </div>
  );
};
