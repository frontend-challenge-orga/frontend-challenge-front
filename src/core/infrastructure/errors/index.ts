export class SingletonNotInitializedError extends Error {
  constructor(className: string) {
    super(`The singleton ${className} has not been initialized.`);
    this.name = "SingletonNotInitializedError";
  }
}

export class UserNotLoggedInError extends Error {
  constructor() {
    super("The user should be logged in.");
    this.name = "UserNotLoggedInError";
  }
}

export class ChallengeAlreadyStartedError extends Error {
  constructor() {
    super("The challenge has already been started.");
    this.name = "ChallengeAlreadyStartedError";
  }
}

export class UserNotSubscribedError extends Error {
  constructor() {
    super("The user is not subscribed.");
    this.name = "UserNotSubscribedError";
  }
}

export class NotEnoughChallengeCreditsError extends Error {
  constructor() {
    super("The user does not have enough credits.");
    this.name = "NotEnoughCreditsError";
  }
}

export class NotEnoughDesignCreditsError extends Error {
  constructor() {
    super("The user does not have enough design credits.");
    this.name = "NotEnoughDesignCreditsError";
  }
}

export class FileNotFoundError extends Error {
  constructor() {
    super("The file was not found.");
    this.name = "FileNotFoundError";
  }
}
