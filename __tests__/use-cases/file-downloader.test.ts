import { FileDownloader, type DownloadFileInput } from "@/core/infrastructure/use-cases/file-downloader";
import { NotEnoughDesignCreditsError, UserNotLoggedInError } from "@/core/infrastructure/errors";

const userServiceMock = {
  isUserLogged: jest.fn().mockReturnValue(true),
};

const challengeServiceMock = {
  isPremiumChallenge: jest.fn().mockReturnValue(false),
  getStarterCodeFileLink: jest.fn(),
  getStarterFigmaFileLink: jest.fn(),
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

describe("Downloading a starter file", () => {
  const SUCCESSFUL_INPUT: DownloadFileInput = {
    userId: "fake_user_id",
    challengeId: "fake_challenge_id",
    fileType: "STARTER",
  };
});

describe(FileDownloader.name, () => {
  const SUCCESSFUL_INPUT: DownloadFileInput = {
    userId: "fake_user_id",
    challengeId: "fake_challenge_id",
    fileType: "FIGMA",
  };

  test("successful file downloading", () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    expect(fileDownloading).not.toThrow();
  });

  test("the user should be logged in", () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    userServiceMock.isUserLogged.mockReturnValueOnce(false);

    expect(fileDownloading).rejects.toThrow(UserNotLoggedInError);
  });

  test("the user should have enough design credits", () => {
    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    creditServiceMock.userDesignCredits.mockReturnValueOnce(0);

    expect(fileDownloading).rejects.toThrow(NotEnoughDesignCreditsError);
  });

  beforeEach(() => {
    challengeServiceMock.getStarterCodeFileLink.mockClear();
    challengeServiceMock.getStarterFigmaFileLink.mockClear();
  });

  it("should call getStarterCodeFileLink if fileType equal to STARTER", async () => {
    const SUCCESSFUL_INPUT: DownloadFileInput = {
      userId: "fake_user_id",
      challengeId: "fake_challenge_id",
      fileType: "STARTER",
    };

    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    await fileDownloading();

    expect(challengeServiceMock.getStarterCodeFileLink.mock.calls).toHaveLength(1);
  });

  it("should call getStarterFigmaFileLink if fileType equal to FIGMA", async () => {
    const SUCCESSFUL_INPUT: DownloadFileInput = {
      userId: "fake_user_id",
      challengeId: "fake_challenge_id",
      fileType: "FIGMA",
    };

    const fileDownloading = async () => await FileDownloader.getInstance().do(SUCCESSFUL_INPUT);

    await fileDownloading();

    expect(challengeServiceMock.getStarterFigmaFileLink.mock.calls).toHaveLength(1);
  });
});
