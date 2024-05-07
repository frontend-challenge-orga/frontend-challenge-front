import { FileDownloader, type DownloadFileInput } from "@/core/infrastructure/use-cases/file-downloader";
import { FileNotFoundError, NotEnoughDesignCreditsError, UserNotLoggedInError } from "@/core/infrastructure/errors";
import { DESIGN_PRICE } from "@/config/constants";

const userServiceMock = {
  isUserLogged: jest.fn().mockReturnValue(true),
};

const challengeServiceMock = {
  isPremiumChallenge: jest.fn().mockReturnValue(false),
  getStarterCodeFileLink: jest.fn().mockReturnValue("fake_link"),
  getStarterFigmaFileLink: jest.fn().mockReturnValue("fake_link"),
};

const subscriptionServiceMock = {
  isYearlySubscribed: jest.fn().mockReturnValue(false),
};

const userChallengeServiceMock = {
  alreadyUnlockedFigmaFile: jest.fn().mockReturnValue(false),
  unlockFigmaFile: jest.fn(),
};

const creditServiceMock = {
  userDesignCredits: jest.fn().mockReturnValue(1),
  subtractDesignCredits: jest.fn(),
};

FileDownloader.initialize({
  userService: userServiceMock,
  challengeService: challengeServiceMock,
  subscriptionService: subscriptionServiceMock,
  userChallengeService: userChallengeServiceMock,
  creditService: creditServiceMock,
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("downloading a starter file", () => {
  const SUCCESSFUL_INPUT: DownloadFileInput = {
    userId: "fake_user_id",
    challengeId: "fake_challenge_id",
    fileType: "STARTER",
  };

  test("successful file downloading", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    await fileDownloading();

    expect(challengeServiceMock.getStarterCodeFileLink.mock.calls).toHaveLength(1);
  });

  test("the user should be logged in", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    userServiceMock.isUserLogged.mockReturnValueOnce(false);

    await expect(fileDownloading).rejects.toThrow(UserNotLoggedInError);
  });

  test("should throw in the file can’t be found", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    challengeServiceMock.getStarterCodeFileLink.mockReturnValueOnce(null);

    await expect(fileDownloading).rejects.toThrow(FileNotFoundError);
  });
});

describe("downloading a figma file", () => {
  const SUCCESSFUL_INPUT: DownloadFileInput = {
    userId: "fake_user_id",
    challengeId: "fake_challenge_id",
    fileType: "FIGMA",
  };

  test("successful file downloading", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    await fileDownloading();

    expect(challengeServiceMock.getStarterFigmaFileLink.mock.calls).toHaveLength(1);
  });

  test("should throw in the file can’t be found", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    challengeServiceMock.getStarterFigmaFileLink.mockReturnValueOnce(null);

    await expect(fileDownloading).rejects.toThrow(FileNotFoundError);
  });

  test("the user should be logged in", () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    userServiceMock.isUserLogged.mockReturnValueOnce(false);

    expect(fileDownloading).rejects.toThrow(UserNotLoggedInError);
  });

  test("if the challenge is premium: no intention to debit design credit", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);
    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(true);

    await fileDownloading();

    expect(creditServiceMock.userDesignCredits.mock.calls).toHaveLength(0);
    expect(creditServiceMock.subtractDesignCredits.mock.calls).toHaveLength(0);
    expect(userChallengeServiceMock.unlockFigmaFile.mock.calls).toHaveLength(0);
    expect(challengeServiceMock.getStarterFigmaFileLink.mock.calls).toHaveLength(1);
  });

  test("challenge is FREE + user is yearly subscribed: no intention to debit design credit", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);
    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(false);
    subscriptionServiceMock.isYearlySubscribed.mockReturnValueOnce(true);

    await fileDownloading();

    expect(creditServiceMock.userDesignCredits.mock.calls).toHaveLength(0);
    expect(creditServiceMock.subtractDesignCredits.mock.calls).toHaveLength(0);
    expect(userChallengeServiceMock.unlockFigmaFile.mock.calls).toHaveLength(0);
    expect(challengeServiceMock.getStarterFigmaFileLink.mock.calls).toHaveLength(1);
  });

  test("challenge FREE + user not is yearly subscribed + challenge already unlocked: no intention to debit design credit", async () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);
    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(false);
    subscriptionServiceMock.isYearlySubscribed.mockReturnValueOnce(false);
    userChallengeServiceMock.alreadyUnlockedFigmaFile.mockResolvedValueOnce(true);

    await fileDownloading();

    expect(creditServiceMock.userDesignCredits.mock.calls).toHaveLength(0);
    expect(creditServiceMock.subtractDesignCredits.mock.calls).toHaveLength(0);
    expect(userChallengeServiceMock.unlockFigmaFile.mock.calls).toHaveLength(0);
    expect(challengeServiceMock.getStarterFigmaFileLink.mock.calls).toHaveLength(1);
  });

  test("challenge FREE + user  yearly subscribed + challenge not unlocked: the user don’t have enough credits", async () => {
    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(false);
    subscriptionServiceMock.isYearlySubscribed.mockReturnValueOnce(false);
    userChallengeServiceMock.alreadyUnlockedFigmaFile.mockResolvedValueOnce(false);
    creditServiceMock.userDesignCredits.mockReturnValueOnce(DESIGN_PRICE - 1);
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    await expect(fileDownloading).rejects.toThrow(NotEnoughDesignCreditsError);
  });

  test("challenge FREE + user  yearly subscribed + challenge not unlocked: the user have enough credits", async () => {
    challengeServiceMock.isPremiumChallenge.mockReturnValueOnce(false);
    subscriptionServiceMock.isYearlySubscribed.mockReturnValueOnce(false);
    userChallengeServiceMock.alreadyUnlockedFigmaFile.mockResolvedValueOnce(false);
    creditServiceMock.userDesignCredits.mockReturnValueOnce(DESIGN_PRICE);
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    await fileDownloading();

    expect(creditServiceMock.subtractDesignCredits.mock.calls).toHaveLength(1);
    expect(userChallengeServiceMock.unlockFigmaFile.mock.calls).toHaveLength(1);
  });
});
