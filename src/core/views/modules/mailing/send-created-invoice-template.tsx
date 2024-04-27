import { Html, Text } from "@react-email/components";
import { MailingTailwindProvider } from "@/core/views/providers/MailingTailwindProvider";

type Props = {
  total: number;
};

export const SendCreatedInvoiceTemplate = ({ total }: Props) => {
  return (
    <MailingTailwindProvider>
      <Html lang="en" dir="ltr">
        <Text>Your invoice has been created total: ${total}</Text>
      </Html>
    </MailingTailwindProvider>
  );
};
