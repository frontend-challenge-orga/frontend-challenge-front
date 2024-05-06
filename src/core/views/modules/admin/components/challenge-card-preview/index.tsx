import { ChallengeCardLayout } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-layout";
import { ChallengeCardHeaderPreview } from "@/core/views/modules/admin/components/challenge-card-preview/challenge-card-header-preview";
import { ChallengeCardName } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-name";
import { ChallengeCardLanguage } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-language";
import { ChallengeCardDifficulty } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-difficulty";
import { ChallengeCardDescription } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-description";
import type { FormValues } from "@/core/views/modules/admin/forms/create-challenge-form";

type Props = {
  currentValues: FormValues;
};

export const ChallengeCardPreview = ({ currentValues }: Props) => {
  const { name, description, difficulty, premium } = currentValues;
  const slug = name.toLowerCase().replace(/ /g, "-");

  return (
    <ChallengeCardLayout>
      <ChallengeCardHeaderPreview slug={slug} premium={premium} />

      <div className={"p-6"}>
        <ChallengeCardName slug={slug} name={name} />
        <div className={"flex justify-between items-center gap-2 mt-4 flex-wrap"}>
          <ChallengeCardLanguage />
          <ChallengeCardDifficulty difficulty={difficulty} />
        </div>

        <ChallengeCardDescription description={description} />
      </div>
    </ChallengeCardLayout>
  );
};
