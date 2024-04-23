import { Fragment } from "react";
import { getChallengeById } from "@/infrastructure/data-access/challenge";
import { EditChallengeForm } from "@/infrastructure/framework/modules/admin/forms/edit-challenge-form";
import { Heading } from "@/infrastructure/framework/modules/admin/layouts/main/heading";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditChallengePage({ params }: Props) {
  const challenge = await getChallengeById(Number(params.id));

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
