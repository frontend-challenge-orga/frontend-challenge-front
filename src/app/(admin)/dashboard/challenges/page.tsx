import { Fragment } from "react";
import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";

import { ChallengesList } from "@/core/views/modules/admin/components/challenges-list";
import { Heading } from "@/core/views/modules/admin/layouts/main/heading";
import { ButtonLink } from "@/core/views/components/ui/button-link";
import { URL } from "@/config/constants";

export default async function ChallengesPage() {
  const challenges = await challengeRepository.index();

  return (
    <Fragment>
      <div className="mb-12 flex items-center justify-between">
        <Heading>Challenges</Heading>
        <ButtonLink href={URL.DASHBOARD_CHALLENGES_CREATE}>Create</ButtonLink>
      </div>
      <ChallengesList challenges={challenges} />
    </Fragment>
  );
}
