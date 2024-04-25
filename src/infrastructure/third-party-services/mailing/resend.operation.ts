import { resend } from "@/config/libs/resend";

export async function sendSubscriptionConfirmation(email: string) {
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

export async function sendCancellationSubscriptionConfirmation(email: string) {
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

export async function sendAbortedSubscription(email: string) {
  if (!email) {
    throw new Error("Missing required email");
  }

  return resend.emails.send({
    from: "contact@frontend-challenge.com",
    to: email,
    subject: "Subscription Renewal Failed",
    html: `<p>Your subscription renewal has failed</p>`,
  });
}

export async function sendUpcomingInvoice(
  email: string,
  nextPaymentAttempt: Date,
) {
  if (!email) {
    throw new Error("Missing required email");
  }

  return resend.emails.send({
    from: "contact@frontend-challenge.com",
    to: email,
    subject: "Upcoming Invoice",
    html: `<p>Your subscription will be renewed soon ${nextPaymentAttempt.toISOString()}</p>`,
  });
}

export async function sendCreatedInvoice(email: string, total: number) {
  if (!email) {
    throw new Error("Missing required email");
  }

  return resend.emails.send({
    from: "contact@frontend-challenge.com",
    to: email,
    subject: "Invoice Created",
    html: `<p>Your invoice has been created total: ${total}</p>`,
  });
}
