import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/views//components/ui/card";
import { ButtonLink } from "@/core/views//components/ui/button-link";
import { RemoveChallengeForm } from "@/core/views/modules/admin/forms/remove-challenge-form";
import { URL } from "@/config/constants";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  challenges: ChallengeDTO[] | undefined;
};

export const ChallengesList = ({ challenges }: Props) => {
  return (
    <ul role="list" className="space-y-4">
      {challenges?.map((challenge) => (
        <li key={challenge.id}>
          <Card>
            <CardHeader>
              <CardTitle>{challenge.name}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>

            <CardFooter>
              <ButtonLink href={`${URL.DASHBOARD_CHALLENGES}/${challenge.id}`}>
                Edit
              </ButtonLink>

              <RemoveChallengeForm challengeId={challenge.id} />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
