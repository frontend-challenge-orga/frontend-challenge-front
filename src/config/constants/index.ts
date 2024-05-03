export const URL = {
  LANDING: "/",
  CHALLENGES: "/challenges",
  SOLUTIONS: "/solutions",
  SUBSCRIPTION: "/subscription",
  DASHBOARD: "/dashboard",
  DASHBOARD_CHALLENGES: "/dashboard/challenges",
  DASHBOARD_CHALLENGES_CREATE: "/dashboard/challenges/create",
  DASHBOARD_SUBSCRIPTIONS: "/dashboard/subscriptions",
};

export const NAVIGATION = [
  { name: "Challenges", href: URL.CHALLENGES },
  { name: "Solutions", href: URL.SOLUTIONS },
  { name: "Unlock Pro", href: URL.SUBSCRIPTION },
];

export const ROLE = {
  USER: "USER",
  COLLABORATOR: "COLLABORATOR",
  ADMIN: "ADMIN",
};

export const CHALLENGE_PRICE = 1;

export const LANGUAGE = ["HTML_CSS", "JS", "API"] as const;

export const SUBSCRIPTION = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
} as const;

export const FILE_TYPE = {
  STARTER: "STARTER",
  FIGMA: "FIGMA",
} as const;

export const DIFFICULTY = ["NEWBIE", "JUNIOR", "INTERMEDIATE", "ADVANCED", "GURU"] as const;

export const PROTECTED_ROUTE_ERROR = {
  ADMIN: "User is not an admin or not logged in. Redirecting to /.",
  PROFILE: "User is not logged in. Redirecting to /.",
};

export const ACTION_ERROR = {
  ADMIN: "You are not authorized to perform this action.",
  USER: "You are not logged in.",
  CREATE_CHECKOUT_SESSION: "An error occurred while creating the checkout session. Contact support.",
  CANCEL_SUBSCRIPTION: "An error occurred while canceling the subscription. Contact support.",
  CREATE_CHALLENGE: "An error occurred while creating the challenge.",
  START_CHALLENGE: "An error occurred while starting the challenge.",
  INSUFFICIENT_CHALLENGE_CREDITS: "You don't have enough credit to start the challenge.",
  INSUFFICIENT_DESIGN_CREDITS: "You don't have enough credit to download the design file.",
  REMOVE_CHALLENGE: "An error occurred while removing the challenge.",
  SUBMIT_CHALLENGE_SOLUTION: "An error occurred while submitting the challenge solution.",
  DOWNLOAD_FILE: "An error occurred while downloading the file.",
  USER_HAS_NO_SUBSCRIPTION: "User has no subscription.",
  USER_NOT_LOGGED_IN: "User is not logged in.",
};
