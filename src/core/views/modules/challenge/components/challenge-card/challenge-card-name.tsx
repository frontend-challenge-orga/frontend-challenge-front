import Link from "next/link";
import { Typography } from "@/core/views/components/typography";

type Props = {
  slug: string;
  name: string;
};

export const ChallengeCardName = ({ slug, name }: Props) => {
  return (
    <Link href={`/challenges/${slug}`} className={""}>
      <Typography.Title as={"h3"} className={"font-normal text-2xl hover:underline hover:underline-offset-1"}>
        {name}
      </Typography.Title>
    </Link>
  );
};
