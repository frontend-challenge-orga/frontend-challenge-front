export type CreateEmailResponse = {
  success: boolean;
  message: string;
};

export interface IMailingRepository {
  sendSubscriptionConfirmation(email: string): Promise<CreateEmailResponse>;
  sendCancellationSubscriptionConfirmation(
    email: string,
  ): Promise<CreateEmailResponse>;
  sendAbortedSubscription(email: string): Promise<CreateEmailResponse>;
  sendUpcomingInvoice(
    email: string,
    nextPaymentAttempt: Date,
  ): Promise<CreateEmailResponse>;
  sendCreatedInvoice(
    email: string,
    total: number,
  ): Promise<CreateEmailResponse>;
}
