import { Html, Text } from "@react-email/components";
import { MailingTailwindProvider } from "@/core/views/providers/MailingTailwindProvider";

type Props = {
  subscriptionEndDate: Date;
};

export const SendCancellationSubscriptionConfirmationTemplate = ({
  subscriptionEndDate,
}: Props) => {
  return (
    <MailingTailwindProvider>
      <Html lang="en" dir="ltr">
        <Text>
          Your subscription has been successfully canceled and will expire on{" "}
          {subscriptionEndDate.toLocaleDateString()}.
        </Text>
      </Html>
    </MailingTailwindProvider>
  );
};
