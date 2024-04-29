import { Fragment } from "react";

import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { EditChallengeForm } from "@/core/views/modules/admin/forms/edit-challenge-form";
import { Heading } from "@/core/views/modules/admin/layouts/main/heading";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditChallengePage({ params }: Props) {
  const challenge = await challengeService.getChallengeById(Number(params.id));

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <Fragment>
      <div className="mb-12 flex items-center justify-between">
        <Heading>Edit challenge</Heading>
      </div>

      <EditChallengeForm challenge={challenge} />
    </Fragment>
  );
}
