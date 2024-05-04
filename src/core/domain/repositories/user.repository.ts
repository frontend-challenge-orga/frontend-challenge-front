import type { User } from "@/core/domain/entities/user.entity";

export interface IUserRepository {
  index(): Promise<User[]>;
  show(id: string): Promise<User>;
  update(user: User): Promise<User>;
  updatePoints(id: string, points: number): Promise<User>;
  delete(id: string): Promise<void>;
  getLoggedUser(id: string): Promise<boolean>;
}
