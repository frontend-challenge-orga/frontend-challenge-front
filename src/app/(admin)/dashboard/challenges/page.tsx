import { Fragment } from "react";
import { getChallenges } from "@/data-access/challenge";
import { ChallengesList } from "@/framework/modules/admin/components/challenges-list";
import { Heading } from "@/framework/modules/admin/layouts/main/heading";
import { ButtonLink } from "@/framework/components/ui/button-link";
import { URL } from "@/config/constants";

export default async function ChallengesPage() {
  const challenges = await getChallenges();

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
