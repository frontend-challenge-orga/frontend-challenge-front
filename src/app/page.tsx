import { getServerAuthSession } from "@/config/server/auth";
import { LogoutButton } from "@/infrastructure/framework/components/ui/logout-button";
import { LoginButton } from "@/infrastructure/framework/components/ui/login-button";
import { CancelSubscriptionForm } from "@/infrastructure/framework/modules/payment/components/cancel-subscription-form";
import { SendEmailButton } from "@/infrastructure/framework/modules/payment/components/send-email-button";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <p>{session?.user.email}</p>
      <LoginButton session={session} />
      <LogoutButton session={session} />
      <CancelSubscriptionForm />
      <SendEmailButton />
    </main>
  );
}
