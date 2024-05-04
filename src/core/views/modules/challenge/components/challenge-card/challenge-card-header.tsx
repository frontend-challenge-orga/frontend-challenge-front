import Link from "next/link";
import Image from "next/image";
import { ChallengeCardPricing } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-pricing";
import { ChallengeCardCompleted } from "@/core/views/modules/challenge/components/challenge-card/challenge-card-completed";

import type { Session } from "next-auth";

type Props = {
  slug: string;
  picture?: string;
  premium: boolean;
  isCompletedChallenge: boolean;
  session: Session | null;
};

export const ChallengeCardHeader = ({ slug, premium, isCompletedChallenge, session }: Props) => {
  return (
    <div className={"relative h-36 sm:h-72 md:h-[282px] overflow-hidden rounded-t-lg"}>
      <Link href={`/challenges/${slug}`}>
        <div className="h-full transform transition-transform duration-500 hover:scale-110">
          <Image src={"/challenge.webp"} layout={"fill"} objectFit={"cover"} className={"w-full h-full"} alt={""} />
          <div className={"absolute inset-0 bg-black opacity-30"} />
        </div>
      </Link>

      <ChallengeCardPricing premium={premium} />
      <ChallengeCardCompleted session={session} isCompletedChallenge={isCompletedChallenge} />
    </div>
  );
};
