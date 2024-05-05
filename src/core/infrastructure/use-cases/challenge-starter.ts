import {
  UserNotLoggedInError,
  ChallengeAlreadyStartedError,
  UserNotSubscribedError,
  NotEnoughCreditsError,
  SingletonNotInitializedError,
} from "@/core/infrastructure/errors";
import { type IUserChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import { type IUserService } from "@/core/infrastructure/services/user.service";
import { type IChallengeService } from "@/core/infrastructure/services/challenge.service";
import { type ISubscriptionService } from "@/core/infrastructure/services/subscription.service";
import { type ICreditService } from "@/core/infrastructure/services/credit.service";
import { CHALLENGE_PRICE } from "@/config/constants";

type UserService = Pick<IUserService, "isUserLogged">;
type UserChallengeService = Pick<IUserChallengeService, "getStartedChallenge" | "startChallenge">;
type ChallengeService = Pick<IChallengeService, "isPremiumChallenge">;
type SubscriptionService = Pick<ISubscriptionService, "isMonthlySubscribed" | "isSubscribed">;
type CreditService = Pick<ICreditService, "userChallengeCredits" | "subtractChallengeCredits">;

export type StartChallengeInput = {
  userId: string;
  challengeId: string;
};

type ChallengeStarterInput = {
  userService: UserService;
  userChallengeService: UserChallengeService;
  challengeService: ChallengeService;
  subscriptionService: SubscriptionService;
  creditService: CreditService;
};

export class ChallengeStarter {
  private static instance: ChallengeStarter | undefined;
  private userService: UserService;
  private userChallengeService: UserChallengeService;
  private challengeService: ChallengeService;
  private subscriptionService: SubscriptionService;
  private creditService: CreditService;

  private constructor(input: ChallengeStarterInput) {
    this.userService = input.userService;
    this.userChallengeService = input.userChallengeService;
    this.challengeService = input.challengeService;
    this.subscriptionService = input.subscriptionService;
    this.creditService = input.creditService;
  }

  public static getInstance() {
    if (ChallengeStarter.instance === undefined) {
      throw new SingletonNotInitializedError(ChallengeStarter.name);
    }

    return ChallengeStarter.instance;
  }

  public static initialize(input: ChallengeStarterInput) {
    if (ChallengeStarter.instance === undefined) {
      ChallengeStarter.instance = new ChallengeStarter(input);
    }
  }

  public async do({ userId, challengeId }: StartChallengeInput) {
    const userIsLoggedIn = await this.userService.isUserLogged(userId);

    if (!userIsLoggedIn) {
      throw new UserNotLoggedInError();
    }

    const userHasStartedChallenge = await this.userChallengeService.getStartedChallenge(userId, challengeId);

    if (userHasStartedChallenge !== null) {
      throw new ChallengeAlreadyStartedError();
    }

    const challengeIsPremium = await this.challengeService.isPremiumChallenge(challengeId);
    const isSubscribed = await this.subscriptionService.isSubscribed(userId);
    const userIsMonthlySubscribed = await this.subscriptionService.isMonthlySubscribed(userId);

    if (challengeIsPremium && !isSubscribed) {
      throw new UserNotSubscribedError();
    }

    if (challengeIsPremium && userIsMonthlySubscribed) {
      const userCredits = await this.creditService.userChallengeCredits(userId);

      if (userCredits < CHALLENGE_PRICE) {
        throw new NotEnoughCreditsError();
      }

      await this.creditService.subtractChallengeCredits(userId, CHALLENGE_PRICE);
    }

    await this.userChallengeService.startChallenge(userId, challengeId);
  }
}

//Idealy we want to place the initialization of the singleton here but it breaks the tests
//Jest struggles when importing the services concretions
