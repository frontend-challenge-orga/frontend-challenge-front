import type { Challenge } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/framework/components/ui/card";
import { ButtonLink } from "@/framework/components/ui/button-link";
import { URL } from "@/config/constants";

type Props = {
  challenges: Challenge[] | undefined;
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
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
