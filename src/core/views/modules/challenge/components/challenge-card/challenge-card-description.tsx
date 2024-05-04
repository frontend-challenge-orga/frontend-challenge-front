import React from "react";
import { Typography } from "@/core/views/components/typography";

type Props = {
  description: string;
};

export const ChallengeCardDescription = ({ description }: Props) => {
  return (
    <div className={"mt-4"}>
      <Typography.Paragraph className={"font-medium text-gray-700"}>{description}</Typography.Paragraph>
    </div>
  );
};
