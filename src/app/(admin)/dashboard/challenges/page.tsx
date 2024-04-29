import { Fragment } from "react";

import { ChallengesList } from "@/core/views/modules/admin/components/challenges-list";
import { Heading } from "@/core/views/modules/admin/layouts/main/heading";
import { ButtonLink } from "@/core/views/components/ui/button-link";
import { URL } from "@/config/constants";
import { challengeService } from "@/core/infrastructure/services/challenge.service";

export default async function ChallengesPage() {
  const challenges = await challengeService.getChallenges();

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
