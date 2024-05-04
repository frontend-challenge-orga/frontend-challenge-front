import type { Language } from "@/core/domain/entities/challenge.entity";

type Props = {
  language?: Language;
};

export const ChallengeCardLanguage = ({ language }: Props) => {
  return (
    <div className={"flex gap-2"}>
      <span className={"uppercase text-[#6ABECD] font-bold text-lg"}>HTML</span>
      <span className={"uppercase text-[#3E54A3] font-bold text-lg"}>CSS</span>
      <span className={"uppercase text-[#CF6390] font-bold text-lg"}>JS</span>
    </div>
  );
};
