import { mailingService } from "@/core/infrastructure/services/resend.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";

export async function handleCanceledSubscription(
  userId: string,
  userEmail: string,
  subscriptionEndDate: Date,
) {
  await subscriptionService.cancelSubscription(userId);

  await mailingService(userEmail).sendCancellationSubscriptionConfirmation(
    subscriptionEndDate,
  );
}
