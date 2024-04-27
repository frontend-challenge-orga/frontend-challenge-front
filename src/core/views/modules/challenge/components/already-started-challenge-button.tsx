import React from "react";
import { ButtonLink } from "@/core/views/components/ui/button-link";

type Props = {
  slug: string;
};

export const AlreadyStartedChallengeButton = ({ slug }: Props) => {
  return (
    <ButtonLink href={`/challenges/${slug}/hub`}>
      Visite challenge hub
    </ButtonLink>
  );
};
