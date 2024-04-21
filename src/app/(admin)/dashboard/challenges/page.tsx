import { Fragment } from "react";
import challengeService from "@/backend/services/challenge.service";
import { ChallengesList } from "@/modules/admin/components/challenges-list";
import { Heading } from "@/modules/admin/layouts/main/heading";
import { ButtonLink } from "@/components/button-link";
import { URL } from "@/config/constants";

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
