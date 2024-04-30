import { createSafeActionClient, DEFAULT_SERVER_ERROR } from "next-safe-action";
import { getServerAuthSession } from "@/config/server/auth";
import { ACTION_ERROR, ROLE } from "@/config/constants";

export const adminAction = createSafeActionClient({
  handleReturnedServerError(e) {
    console.log(e);
    return DEFAULT_SERVER_ERROR;
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (session?.user.role !== ROLE.ADMIN) throw new Error(ACTION_ERROR.ADMIN);

    return {
      userId: session.user.id,
    };
  },
});

export class MyCustomError extends Error {}

export const userAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof MyCustomError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (!session) throw new Error(ACTION_ERROR.USER);

    return {
      userId: session.user.id,
      userEmail: session.user.email!,
      userRole: session.user.role,
      userPoints: session.user.points,
      userSubscription: session.user.subscribed,
      userSubscriptionDuration: session.user.subscription_duration,
      userCreditChallengeAmount: session.user.credit_challenge_amount,
      userCreditDesignAmount: session.user.credit_design_amount,
    };
  },
});
