import { Fragment } from "react";
import { SubscriptionForm } from "@/infrastructure/framework/modules/payment/forms/subscription-form";

export default async function SubscriptionPage() {
  return (
    <Fragment>
      <SubscriptionForm />
    </Fragment>
  );
}
