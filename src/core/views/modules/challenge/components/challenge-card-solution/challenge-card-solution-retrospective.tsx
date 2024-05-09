type Props = {
  retrospective: string;
};

export const ChallengeCardSolutionRetrospective = ({ retrospective }: Props) => {
  return (
    <div className="p-6">
      <p>{retrospective}</p>
    </div>
  );
};
