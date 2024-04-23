import challengeService from "@/backend/services/challenge.service";
import { EditChallengeForm } from "@/framework/admin/forms/edit-challenge-form";
import { Fragment } from "react";
import { Heading } from "@/framework/admin/layouts/main/heading";

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
