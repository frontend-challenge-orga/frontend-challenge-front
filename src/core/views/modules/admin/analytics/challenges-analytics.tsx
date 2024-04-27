import { challengeRepository } from "@/core/infrastructure/repositories/challenge.repository";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/views/components/ui/card";

export const ChallengesAnalytics = async () => {
  const challengesCount = await challengeRepository.count();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
        <CardDescription>{challengesCount} challenges created</CardDescription>
      </CardHeader>
    </Card>
  );
};
