import { createCheckoutSessionAction } from "@/core/views/actions/payment/create-checkout-session";
import { checkoutSessionRedirection } from "@/core/views/modules/payment/helpers/checkout-session-redirection";
import type { SubscriptionDurationType } from "@/config/types";

export default async function handleCheckoutSession(
  subscriptionDuration: SubscriptionDurationType,
) {
  const response = await createCheckoutSessionAction({
    subscription_duration: subscriptionDuration,
  });

  if (!response.data) {
    console.error("Error creating stripe session:", response.serverError);
    return;
  }

  const checkoutSessionURL = response.data.url;

  if (!checkoutSessionURL) {
    console.error("Invalid server response: No URL provided");
    return;
  }

  checkoutSessionRedirection(checkoutSessionURL);
}
