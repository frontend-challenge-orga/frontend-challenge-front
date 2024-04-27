import { Html, Text } from "@react-email/components";
import { MailingTailwindProvider } from "@/core/views/providers/MailingTailwindProvider";

export const SendCancellationSubscriptionConfirmationTemplate = () => {
  return (
    <MailingTailwindProvider>
      <Html lang="en" dir="ltr">
        <Text>Your subscription has been successfully canceled</Text>
      </Html>
    </MailingTailwindProvider>
  );
};
