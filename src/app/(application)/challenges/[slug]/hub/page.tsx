import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import { ChallengeNotFound } from "@/core/views/modules/challenge/components/challenge-not-found";
import { DownloadStarterFile } from "@/core/views/modules/challenge/components/download-starter-file";
import { DownloadDesignFile } from "@/core/views/modules/challenge/components/download-design-file";
import { getServerAuthSession } from "@/config/server/auth";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ChallengeHubPage({ params }: Props) {
  const session = await getServerAuthSession();
  const challenge = await challengeRepository.showBySlug(params.slug);

  if (!session || !challenge) {
    return <ChallengeNotFound />;
  }

  return (
    <div>
      <DownloadStarterFile challenge={challenge} />
      <DownloadDesignFile session={session} challenge={challenge} />
    </div>
  );
}
