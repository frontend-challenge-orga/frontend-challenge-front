export const URL = {
  LOGIN: "/api/auth/signin",
  HOME: "/",
  ADMIN: "/admin",
};

export const ROLE = {
  USER: "USER",
  COLLABORATOR: "COLLABORATOR",
  ADMIN: "ADMIN",
};

export const PROTECTED_ROUTE_ERROR = {
  ADMIN: "User is not an admin or not logged in. Redirecting to /.",
  PROFILE: "User is not logged in. Redirecting to /.",
};
