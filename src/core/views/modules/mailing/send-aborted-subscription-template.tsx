import { Html, Text } from "@react-email/components";
import { MailingTailwindProvider } from "@/core/views/providers/MailingTailwindProvider";

export const SendAbortedSubscriptionTemplate = () => {
  return (
    <MailingTailwindProvider>
      <Html lang="en" dir="ltr">
        <Text>Your subscription renewal has failed</Text>
      </Html>
    </MailingTailwindProvider>
  );
};
