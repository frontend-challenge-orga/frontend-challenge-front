import { Html, Text } from "@react-email/components";
import { MailingTailwindProvider } from "@/core/views/providers/MailingTailwindProvider";

export const SendSubscriptionTemplate = () => {
  return (
    <MailingTailwindProvider>
      <Html lang="en" dir="ltr">
        <Text>
          Congratulations! You have successfully subscribed to Frontend
          challenge
        </Text>
      </Html>
    </MailingTailwindProvider>
  );
};
