enum Role {
  USER = "USER",
  COLLABORATOR = "COLLABORATOR",
  ADMIN = "ADMIN",
}

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  credits: number;
  premium: boolean;
};
