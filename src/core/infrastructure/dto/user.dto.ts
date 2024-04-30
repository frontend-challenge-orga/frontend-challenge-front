export type UserDTO = {
  readonly id: string;
  readonly name: string | null;
  readonly email: string | null;
  readonly emailVerified: Date | null;
  readonly image: string | null;
  readonly role: "USER" | "COLLABORATOR" | "ADMIN";
  readonly points: number;
};

export type SaveUserDTO = Omit<UserDTO, "id">;
