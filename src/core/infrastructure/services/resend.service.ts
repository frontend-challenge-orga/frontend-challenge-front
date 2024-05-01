import { resend } from "@/config/libs/resend";
import { SendSubscriptionTemplate } from "@/core/views/modules/mailing/send-subscription-template";
import { SendCancellationSubscriptionConfirmationTemplate } from "@/core/views/modules/mailing/send-cancellation-subscription-confirmation-template";
import { SendAbortedSubscriptionTemplate } from "@/core/views/modules/mailing/send-aborted-subscription-template";
import { SendUpcomingInvoiceTemplate } from "@/core/views/modules/mailing/send-upcoming-invoice-template";
import { SendCreatedInvoiceTemplate } from "@/core/views/modules/mailing/send-created-invoice-template";

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
        react: SendSubscriptionTemplate(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  sendCancellationSubscriptionConfirmation: async (
    subscriptionEndDate: Date,
  ) => {
    if (!email) {
      throw new Error("Missing required email");
    }

    try {
      return resend.emails.send({
        from: "contact@frontend-challenge.com",
        to: email,
        subject: "Subscription Cancellation",
        react: SendCancellationSubscriptionConfirmationTemplate({
          subscriptionEndDate,
        }),
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
        react: SendAbortedSubscriptionTemplate(),
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
        react: SendUpcomingInvoiceTemplate({ nextPaymentAttempt }),
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
        react: SendCreatedInvoiceTemplate({ total }),
      });
    } catch (error) {
      console.error(error);
    }
  },
});
