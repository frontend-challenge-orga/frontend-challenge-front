import { Badge } from "@/core/views/components/ui/badge";

type Props = {
  premium: boolean;
};

export const ChallengeCardPricing = ({ premium }: Props) => {
  return (
    <div className={"absolute top-2 right-2 sm:top-4 sm:right-4"}>
      <Badge variant={premium ? "premium" : "free"} className={"uppercase"}>
        {premium ? "premium" : "free"}
      </Badge>
    </div>
  );
};
