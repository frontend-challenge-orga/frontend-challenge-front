import challengeRepository from "@/infrastructure/data-access/challenge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/infrastructure/framework/components/ui/card";

// Todo: Implement Challenges started

export const ChallengesAnalytics = async () => {
  const challengesCount = await challengeRepository.getChallengesCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
        <CardDescription>{challengesCount} challenges created</CardDescription>
      </CardHeader>
    </Card>
  );
};
