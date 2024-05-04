import {
  ChallengeAlreadyStartedError,
  NotEnoughCreditsError,
  UserNotLoggedInError,
  UserNotSubscribedError,
} from "@/core/infrastructure/errors";
import { ChallengeStarter, type StartChallengeInput } from "../../src/core/infrastructure/use-cases/challenge-starter";

const userServiceMock = {
  isUserLogged: jest.fn().mockReturnValue(true),
};
const userChallengeServiceMock = {
  getStartedChallenge: jest.fn().mockReturnValue(null),
  startChallenge: jest.fn(),
};
const challengeServiceMock = {
  isPremiumChallenge: jest.fn().mockReturnValue(false),
};
const subscriptionServiceMock = {
  isMonthlySubscribed: jest.fn().mockReturnValue(false),
  isSubscribed: jest.fn().mockReturnValue(false),
};
const creditServiceMock = {
  userChallengeCredits: jest.fn().mockReturnValue(0),
  subtractChallengeCredits: jest.fn(),
};

ChallengeStarter.initialize({
  userService: userServiceMock,
  userChallengeService: userChallengeServiceMock,
  challengeService: challengeServiceMock,
  subscriptionService: subscriptionServiceMock,
  creditService: creditServiceMock,
});

describe(ChallengeStarter.name, () => {
  const SUCCESSFUL_INPUT: StartChallengeInput = {
    userId: "fake_user_id",
    challengeId: "fake_challenge_id",
  };
  const challengeStarting = async () => await ChallengeStarter.getInstance().do(SUCCESSFUL_INPUT);

  test("successful started challenge", () => {
    expect(challengeStarting).not.toThrow();
  });

  test("the user should be logged in", () => {
    userServiceMock.isUserLogged.mockReturnValueOnce(false);

    expect(challengeStarting).rejects.toThrow(UserNotLoggedInError);
  });

  test("the user should have never started the challenge", () => {
    userChallengeServiceMock.getStartedChallenge.mockReturnValueOnce({});

    expect(challengeStarting).rejects.toThrow(ChallengeAlreadyStartedError);
  });

  test("the user cannot start a premium challenge if he’s not subscribed", () => {
    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(true);
    subscriptionServiceMock.isSubscribed.mockReturnValueOnce(false);

    expect(challengeStarting).rejects.toThrow(UserNotSubscribedError);
  });

  test("if the challenge is premium + the user is MONTHLY subscribed: he user should have enough credits", () => {
    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(true);
    subscriptionServiceMock.isSubscribed.mockReturnValueOnce(true);
    subscriptionServiceMock.isMonthlySubscribed.mockReturnValueOnce(true);
    creditServiceMock.userChallengeCredits.mockReturnValueOnce(0);

    expect(challengeStarting).rejects.toThrow(NotEnoughCreditsError);
  });
});
