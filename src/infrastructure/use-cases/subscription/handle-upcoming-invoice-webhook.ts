import mailingService from "@/infrastructure/third-party-services/mailing/resend.service";
import type Stripe from "stripe";

export async function handleUpcomingInvoiceWebhook(invoice: Stripe.Invoice) {
  if (!invoice.metadata) {
    throw new Error("Missing required invoice metadata");
  }

  if (!invoice.subscription_details?.metadata) {
    throw new Error("Missing required customer email");
  }

  await mailingService.sendUpcomingInvoice(
    invoice.subscription_details.metadata.customer_email!,
    new Date(invoice.next_payment_attempt! * 1000),
  );
}
