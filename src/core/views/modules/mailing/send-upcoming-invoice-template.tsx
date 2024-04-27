import { Html, Text } from "@react-email/components";
import { MailingTailwindProvider } from "@/core/views/providers/MailingTailwindProvider";

type Props = {
  nextPaymentAttempt: Date;
};

export const SendUpcomingInvoiceTemplate = ({ nextPaymentAttempt }: Props) => {
  return (
    <MailingTailwindProvider>
      <Html lang="en" dir="ltr">
        <Text>
          Your subscription will be renewed soon $
          {nextPaymentAttempt.toISOString()}
        </Text>
      </Html>
    </MailingTailwindProvider>
  );
};
