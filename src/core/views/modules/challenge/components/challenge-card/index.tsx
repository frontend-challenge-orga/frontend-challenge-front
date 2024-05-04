import { ChallengeCardHeader } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-header";
import { ChallengeCardName } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-name";
import { ChallengeCardLanguage } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-language";
import { ChallengeCardDescription } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-description";
import { ChallengeCardDifficulty } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-difficulty";
import { ChallengeTailwindCardLayout } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-layout";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import type { Session } from "next-auth";

type Props = {
  challenge: ChallengeDTO;
  session: Session | null;
};

export const ChallengeCard = ({ challenge, session }: Props) => {
  const { slug, name, description, difficulty, premium } = challenge;

  return (
    <ChallengeTailwindCardLayout>
      <ChallengeCardHeader slug={slug} premium={premium} />

      <div className={"p-6"}>
        <ChallengeCardName slug={slug} name={name} />
        <div className={"flex justify-between items-center gap-2 mt-4 flex-wrap"}>
          <ChallengeCardLanguage />
          <ChallengeCardDifficulty difficulty={difficulty} />
        </div>

        <ChallengeCardDescription description={description} />
      </div>
    </ChallengeTailwindCardLayout>
  );
};
