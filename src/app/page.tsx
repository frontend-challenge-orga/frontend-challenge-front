import { getServerAuthSession } from "@/config/server/auth";
import { LogoutButton } from "@/components/ui/logout-button";
import { LoginButton } from "@/components/ui/login-button";
import dropboxService from "@/backend/services/dropbox.service";

export default async function HomePage() {
  const session = await getServerAuthSession();

  const file = await dropboxService.getFileLink("/starter-code/LOLACCOUNT.txt");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p>{session?.user.email}</p>
      <LoginButton session={session} />
      <LogoutButton session={session} />
    </main>
  );
}
