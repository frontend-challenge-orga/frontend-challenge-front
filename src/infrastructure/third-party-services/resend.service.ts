import { resend } from "@/config/libs/resend";

export async function sendSubscriptionEmailConfirmation(email: string) {
  if (!email) {
    throw new Error("Missing required email");
  }

  return resend.emails.send({
    from: "contact@frontend-challenge.com",
    to: email,
    subject: "Subscription Confirmation",
    html: `<p>Congratulations! You have successfully subscribed to Frontend challenge</p>`,
  });
}

export async function sendCancellationSubscriptionEmail(email: string) {
  if (!email) {
    throw new Error("Missing required email");
  }

  return resend.emails.send({
    from: "contact@frontend-challenge.com",
    to: email,
    subject: "Subscription Cancellation",
    html: `<p>Your subscription has been successfully canceled</p>`,
  });
}
