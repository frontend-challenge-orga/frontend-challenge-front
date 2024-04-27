import { getServerAuthSession } from "@/config/server/auth";
import { LogoutButton } from "@/core/views/components/ui/logout-button";
import { LoginButton } from "@/core/views/components/ui/login-button";
import { CancelSubscriptionForm } from "@/core/views/modules/payment/components/cancel-subscription-form";
import { SendEmailButton } from "@/core/views/modules/payment/components/send-email-button";

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
