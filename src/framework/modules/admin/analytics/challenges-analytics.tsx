import challengeService from "@/backend/services/challenge.service";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Todo: Implement Challenges started

export const ChallengesAnalytics = async () => {
  const challengesCount = await challengeService.getChallengesCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
        <CardDescription>{challengesCount} challenges created</CardDescription>
      </CardHeader>
    </Card>
  );
};
