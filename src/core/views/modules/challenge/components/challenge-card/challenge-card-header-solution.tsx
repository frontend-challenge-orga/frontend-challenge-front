import Link from "next/link";
import Image from "next/image";

type Props = {
  solutionId?: string;
  slug: string;
};

export const ChallengeCardHeaderSolution = ({ solutionId, slug }: Props) => {
  return (
    <div className={"relative h-36 sm:h-72 md:h-[282px] overflow-hidden rounded-t-lg"}>
      <Link href={`/challenges/${slug}/solutions/${solutionId}`}>
        <div className="h-full transform transition-transform duration-500 hover:scale-110">
          <Image src={"/challenge.webp"} layout={"fill"} objectFit={"cover"} className={"w-full h-full"} alt={""} />
          <div className={"absolute inset-0 bg-black opacity-30"} />
        </div>
      </Link>
    </div>
  );
};
