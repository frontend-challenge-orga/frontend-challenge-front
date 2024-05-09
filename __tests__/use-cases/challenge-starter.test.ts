import {
  ChallengeAlreadyStartedError,
  NotEnoughChallengeCreditsError,
  UserNotLoggedInError,
  UserNotSubscribedError,
} from "@/core/infrastructure/errors";
import { ChallengeStarter, type StartChallengeInput } from "@/core/infrastructure/use-cases/challenge-starter";

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe(ChallengeStarter.name, () => {
  const SUCCESSFUL_INPUT: StartChallengeInput = {
    userId: "fake_user_id",
    challengeId: "fake_challenge_id",
  };

  test("should start a challenge successfully", async () => {
    await ChallengeStarter.getInstance().do(SUCCESSFUL_INPUT);

    expect(userChallengeServiceMock.startChallenge).toHaveBeenCalledTimes(1);
  });

  test("should throw when the user is not logged in", () => {
    const challengeStarting = async () => await ChallengeStarter.getInstance().do(SUCCESSFUL_INPUT);

    userServiceMock.isUserLogged.mockReturnValueOnce(false);

    expect(challengeStarting).rejects.toThrow(UserNotLoggedInError);
  });

  test("should throw when the user has already started the challenge", () => {
    const challengeStarting = async () => await ChallengeStarter.getInstance().do(SUCCESSFUL_INPUT);

    userChallengeServiceMock.getStartedChallenge.mockReturnValueOnce({});

    expect(challengeStarting).rejects.toThrow(ChallengeAlreadyStartedError);
  });

  test("should throw when the challenge is premium + the user in not subscribed", () => {
    const challengeStarting = async () => await ChallengeStarter.getInstance().do(SUCCESSFUL_INPUT);

    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(true);
    subscriptionServiceMock.isSubscribed.mockReturnValueOnce(false);

    expect(challengeStarting).rejects.toThrow(UserNotSubscribedError);
  });

  test("should throw when the challenge is premium + the user is MONTHLY subscribed + the user don’t have enough credits", () => {
    const challengeStarting = async () => await ChallengeStarter.getInstance().do(SUCCESSFUL_INPUT);

    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(true);
    subscriptionServiceMock.isSubscribed.mockReturnValueOnce(true);
    subscriptionServiceMock.isMonthlySubscribed.mockReturnValueOnce(true);
    creditServiceMock.userChallengeCredits.mockReturnValueOnce(0);

    expect(challengeStarting).rejects.toThrow(NotEnoughChallengeCreditsError);
  });
});
