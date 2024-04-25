import {
  sendSubscriptionConfirmation,
  sendCancellationSubscriptionConfirmation,
  sendAbortedSubscription,
  sendUpcomingInvoice,
  sendCreatedInvoice,
} from "@/infrastructure/third-party-services/mailing/resend.operation";
import type { IMailingRepository } from "@/domain/interfaces/repositories/mailing.repository";

class MailingService implements IMailingRepository {
  async sendSubscriptionConfirmation(email: string) {
    await sendSubscriptionConfirmation(email);
    return { success: true, message: "Email sent" };
  }

  async sendCancellationSubscriptionConfirmation(email: string) {
    await sendCancellationSubscriptionConfirmation(email);
    return { success: true, message: "Email sent" };
  }

  async sendAbortedSubscription(email: string) {
    await sendAbortedSubscription(email);
    return { success: true, message: "Email sent" };
  }

  async sendUpcomingInvoice(email: string, nextPaymentAttempt: Date) {
    await sendUpcomingInvoice(email, nextPaymentAttempt);
    return { success: true, message: "Email sent" };
  }

  async sendCreatedInvoice(email: string, total: number) {
    await sendCreatedInvoice(email, total);
    return { success: true, message: "Email sent" };
  }
}

const mailingService = new MailingService();
export default mailingService;
