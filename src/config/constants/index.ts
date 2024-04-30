export const URL = {
  LANDING: "/",
  DASHBOARD: "/dashboard",
  DASHBOARD_CHALLENGES: "/dashboard/challenges",
  DASHBOARD_CHALLENGES_CREATE: "/dashboard/challenges/create",
  DASHBOARD_SUBSCRIPTIONS: "/dashboard/subscriptions",
};

export const API_ENDPOINT = {
  LOGIN: "/api/auth/signin",
};

export const ROLE = {
  USER: "USER",
  COLLABORATOR: "COLLABORATOR",
  ADMIN: "ADMIN",
};

export const LANGUAGE = ["HTML_CSS", "JS", "API"] as const;

export const DIFFICULTY_POINTS = {
  NEWBIE: 5,
  JUNIOR: 10,
  INTERMEDIATE: 15,
  ADVANCED: 20,
  GURU: 25,
};

export const SUBSCRIPTION = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
} as const;

export const FILE_TYPE = {
  STARTER: "STARTER",
  FIGMA: "FIGMA",
} as const;

export const DIFFICULTY = [
  "NEWBIE",
  "JUNIOR",
  "INTERMEDIATE",
  "ADVANCED",
  "GURU",
] as const;

export const PROTECTED_ROUTE_ERROR = {
  ADMIN: "User is not an admin or not logged in. Redirecting to /.",
  PROFILE: "User is not logged in. Redirecting to /.",
};

export const ACTION_ERROR = {
  ADMIN: "You are not authorized to perform this action.",
  USER: "You are not logged in.",
  CREATE_CHALLENGE: "An error occurred while creating the challenge.",
  START_CHALLENGE: "An error occurred while starting the challenge.",
  REMOVE_CHALLENGE: "An error occurred while removing the challenge.",
  SUBMIT_CHALLENGE_SOLUTION:
    "An error occurred while submitting the challenge solution.",
  DOWNLOAD_FILE: "An error occurred while downloading the file.",
  INSUFFICIENT_DESIGN_CREDITS:
    "You don't have enough credit to download the design file.",
};
