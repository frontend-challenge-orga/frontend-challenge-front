import { getServerAuthSession } from "@/config/server/auth";
import { Header } from "@/core/views/components/layouts/header";
import { CancelSubscriptionForm } from "@/core/views/modules/payment/forms/cancel-subscription-form";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center space-y-4">
        <p>{session?.user.email}</p>
        <CancelSubscriptionForm />
      </main>
    </>
  );
}
