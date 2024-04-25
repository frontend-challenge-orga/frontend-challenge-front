import type Stripe from "stripe";
import mailingService from "@/infrastructure/third-party-services/mailing/resend.service";

export async function handleCreatedInvoiceWebhook(invoice: Stripe.Invoice) {
  if (!invoice.metadata) {
    throw new Error("Missing required invoice metadata");
  }

  if (!invoice.subscription_details?.metadata) {
    throw new Error("Missing required customer email");
  }

  await mailingService.sendCreatedInvoice(
    invoice.subscription_details.metadata.customer_email!,
    Number((invoice.subtotal / 100).toFixed(2)),
  );
}
