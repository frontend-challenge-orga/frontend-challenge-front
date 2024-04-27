import { mailingService } from "@/core/infrastructure/services/resend.service";
import type Stripe from "stripe";

export async function handleCreatedInvoiceWebhook(invoice: Stripe.Invoice) {
  if (!invoice.metadata) {
    throw new Error("Missing required invoice metadata");
  }

  if (!invoice.subscription_details?.metadata) {
    throw new Error("Missing required customer email");
  }

  await mailingService(
    invoice.subscription_details.metadata.customer_email!,
  ).sendCreatedInvoice(Number((invoice.subtotal / 100).toFixed(2)));
}
