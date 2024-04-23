import { createCheckoutSessionAction } from "@/framework/actions/payment/create-checkout-session";
import { checkoutSessionRedirection } from "@/framework/modules/payment/helpers/checkout-session-redirection";

export default async function handleCheckoutSession() {
  const response = await createCheckoutSessionAction({});

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
