import type Stripe from "stripe";
import { sendCreatedInvoiceEmail } from "@/infrastructure/third-party-services/resend.service";

export async function handleCreatedInvoiceWebhook(invoice: Stripe.Invoice) {
  if (!invoice.metadata) {
    throw new Error("Missing required invoice metadata");
  }

  if (!invoice.subscription_details?.metadata) {
    throw new Error("Missing required customer email");
  }

  await sendCreatedInvoiceEmail(
    invoice.subscription_details.metadata.customer_email!,
    Number((invoice.subtotal / 100).toFixed(2)),
  );
}
