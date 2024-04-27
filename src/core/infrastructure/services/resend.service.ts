import { resend } from "@/config/libs/resend";

export const mailingService = (email: string) => ({
  sendSubscriptionConfirmation: async () => {
    if (!email) {
      throw new Error("Missing required email");
    }

    try {
      return resend.emails.send({
        from: "contact@frontend-challenge.com",
        to: email,
        subject: "Subscription Confirmation",
        html: `<p>Congratulations! You have successfully subscribed to Frontend challenge</p>`,
      });
    } catch (error) {
      console.error(error);
    }
  },

  sendCancellationSubscriptionConfirmation: async () => {
    if (!email) {
      throw new Error("Missing required email");
    }

    try {
      return resend.emails.send({
        from: "contact@frontend-challenge.com",
        to: email,
        subject: "Subscription Cancellation",
        html: `<p>Your subscription has been successfully canceled</p>`,
      });
    } catch (error) {
      console.error(error);
    }
  },

  sendAbortedSubscription: async () => {
    if (!email) {
      throw new Error("Missing required email");
    }

    try {
      return resend.emails.send({
        from: "contact@frontend-challenge.com",
        to: email,
        subject: "Subscription Renewal Failed",
        html: `<p>Your subscription renewal has failed</p>`,
      });
    } catch (error) {
      console.error(error);
    }
  },

  sendUpcomingInvoice: async (nextPaymentAttempt: Date) => {
    if (!email) {
      throw new Error("Missing required email");
    }

    try {
      return resend.emails.send({
        from: "contact@frontend-challenge.com",
        to: email,
        subject: "Upcoming Invoice",
        html: `<p>Your subscription will be renewed soon ${nextPaymentAttempt.toISOString()}</p>`,
      });
    } catch (error) {
      console.error(error);
    }
  },

  sendCreatedInvoice: async (total: number) => {
    if (!email) {
      throw new Error("Missing required email");
    }

    try {
      return resend.emails.send({
        from: "contact@frontend-challenge.com",
        to: email,
        subject: "Invoice Created",
        html: `<p>Your invoice has been created total: ${total}</p>`,
      });
    } catch (error) {
      console.error(error);
    }
  },
});
