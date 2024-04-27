import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";

type Props = {
  params: {
    id: string;
  };
};

export default async function ChallengePage({ params }: Props) {
  const challenge = await challengeRepository.show(Number(params.id));

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return <div>Challenge</div>;
}
