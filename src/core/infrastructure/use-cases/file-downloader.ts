import {
  FileNotFoundError,
  NotEnoughDesignCreditsError,
  SingletonNotInitializedError,
  UserNotLoggedInError,
} from "@/core/infrastructure/errors";
import { DESIGN_PRICE, FIleType } from "@/config/constants";
import type { IUserService } from "@/core/infrastructure/services/user.service";
import type { IChallengeService } from "@/core/infrastructure/services/challenge.service";
import type { ISubscriptionService } from "@/core/infrastructure/services/subscription.service";
import type { IUserChallengeService } from "@/core/infrastructure/services/user.challenge.service";
import type { ICreditService } from "@/core/infrastructure/services/credit.service";
import type { FileType } from "@/config/types";

type UserService = Pick<IUserService, "isUserLogged">;
type ChallengeService = Pick<
  IChallengeService,
  "isPremiumChallenge" | "getStarterCodeFileLink" | "getStarterFigmaFileLink"
>;
type SubscriptionService = Pick<ISubscriptionService, "isYearlySubscribed">;
type UserChallengeService = Pick<IUserChallengeService, "alreadyUnlockedFigmaFile" | "unlockFigmaFile">;
type CreditService = Pick<ICreditService, "userDesignCredits" | "subtractDesignCredits">;

export type DownloadFileInput = {
  userId: string;
  challengeId: string;
  fileType: FileType;
};

type FileDownloaderInput = {
  userService: UserService;
  challengeService: ChallengeService;
  subscriptionService: SubscriptionService;
  userChallengeService: UserChallengeService;
  creditService: CreditService;
};

export class FileDownloader {
  private static instance: FileDownloader | undefined;
  private userService: UserService;
  private challengeService: ChallengeService;
  private subscriptionService: SubscriptionService;
  private userChallengeService: UserChallengeService;
  private creditService: CreditService;

  private constructor(input: FileDownloaderInput) {
    this.userService = input.userService;
    this.challengeService = input.challengeService;
    this.subscriptionService = input.subscriptionService;
    this.userChallengeService = input.userChallengeService;
    this.creditService = input.creditService;
  }

  public static getInstance() {
    if (FileDownloader.instance === undefined) {
      throw new SingletonNotInitializedError(FileDownloader.name);
    }

    return FileDownloader.instance;
  }

  public static initialize(input: FileDownloaderInput) {
    if (FileDownloader.instance === undefined) {
      FileDownloader.instance = new FileDownloader(input);
    }
  }

  public async do({ userId, challengeId, fileType }: DownloadFileInput) {
    const userLoggedIn = await this.userService.isUserLogged(userId);

    if (!userLoggedIn) throw new UserNotLoggedInError();

    const isFigmaType = fileType === FIleType.FIGMA;
    const isYearlySubscribed = await this.subscriptionService.isYearlySubscribed(userId);
    const isPremiumChallenge = await this.challengeService.isPremiumChallenge(challengeId);
    const alreadyUnlockedFigmaFile = await this.userChallengeService.alreadyUnlockedFigmaFile(userId, challengeId);

    const isCreditableFile = isFigmaType && !isPremiumChallenge && !isYearlySubscribed && !alreadyUnlockedFigmaFile;

    if (isCreditableFile) {
      const userCredits = await this.creditService.userDesignCredits(userId);

      if (userCredits < DESIGN_PRICE) {
        throw new NotEnoughDesignCreditsError();
      }

      await this.creditService.subtractDesignCredits(userId, 1);
      await this.userChallengeService.unlockFigmaFile(userId, challengeId);
    }

    let fileLink: string | null;

    if (isFigmaType) {
      fileLink = await this.challengeService.getStarterFigmaFileLink(challengeId);
    } else {
      fileLink = await this.challengeService.getStarterCodeFileLink(challengeId);
    }

    if (fileLink === null) throw new FileNotFoundError();

    return fileLink;
  }

  private async treatStar
}
