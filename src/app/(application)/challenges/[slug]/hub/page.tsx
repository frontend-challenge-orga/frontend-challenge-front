import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { ChallengeNotFound } from "@/core/views/modules/challenge/components/challenge-not-found";
import { DownloadStarterFile } from "@/core/views/modules/challenge/components/download-starter-file";
import { DownloadDesignFile } from "@/core/views/modules/challenge/components/download-design-file";
import { SubmitSolutionCta } from "@/core/views/modules/challenge/components/challenge-filter/submit-solution-cta";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ChallengeHubPage({ params }: Props) {
  const challenge = await challengeService.getChallengeBySlug(params.slug);

  if (!challenge) {
    return <ChallengeNotFound />;
  }

  return (
    <div>
      <DownloadStarterFile challenge={challenge} />
      <DownloadDesignFile challenge={challenge} />
      <SubmitSolutionCta slug={challenge.slug} />
    </div>
  );
}
