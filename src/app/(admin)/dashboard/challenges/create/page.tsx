import { Fragment } from "react";
import { Heading } from "@/framework/modules/admin/layouts/main/heading";
import { CreateChallengeForm } from "@/framework/modules/admin/forms/create-challenge-form";

export default function CreateChallengePage() {
  return (
    <Fragment>
      <div className="mb-12 flex items-center justify-between">
        <Heading>Create challenge</Heading>
      </div>

      <CreateChallengeForm />
    </Fragment>
  );
}
