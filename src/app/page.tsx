import { getServerAuthSession } from "@/config/server/auth";
import { LogoutButton } from "@/components/ui/logout-button";
import { LoginButton } from "@/components/ui/login-button";
import { CheckoutButton } from "@/modules/payment/components/checkout-button";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p>{session?.user.email}</p>
      <LoginButton session={session} />
      <LogoutButton session={session} />
      <CheckoutButton />
    </main>
  );
}
