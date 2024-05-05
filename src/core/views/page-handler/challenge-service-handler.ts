import { challengeService } from "@/core/infrastructure/services/challenge.service";
import { userChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { subscriptionService } from "@/core/infrastructure/services/subscription.service";

export const challengeServiceHandler = async () => {
  const getChallenge = async (params: { slug: string }) => await challengeService.getChallengeBySlug(params.slug);
  const getStartedChallenge = async (userId: string | undefined, params: { slug: string }) =>
    await userChallengeService.hasUserStartedChallenge(userId, params.slug);
  const getSubscription = async (userId: string | undefined) => await subscriptionService.isSubscribed(userId);

  return { getChallenge, getStartedChallenge, getSubscription };
};
