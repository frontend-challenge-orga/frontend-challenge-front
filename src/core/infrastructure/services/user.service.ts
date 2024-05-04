import { userRepository } from "@/core/infrastructure/repositories/user.repository";
import { UserTransformer } from "@/core/infrastructure/transformers/user-transformer";
import type { User } from "@/core/domain/entities/user.entity";
import type { UserDTO } from "../dto/user.dto";

export interface IUserService {
  getUsers(): Promise<UserDTO[]>;
  getUserById(id: string): Promise<UserDTO>;
  updateUser(data: User): Promise<UserDTO>;
  updateUserPoints(id: string, points: number): Promise<UserDTO>;
  deleteUser(id: string): Promise<void>;
  isUserLogged(id: string): Promise<boolean>;
}

export const userService: IUserService = {
  getUsers: async () => {
    return userRepository.index().then((users) => {
      return users?.map((user: User) => {
        return UserTransformer.toEntity(user);
      });
    });
  },

  getUserById: async (id: string) => {
    return userRepository.show(id).then((user) => {
      return UserTransformer.toEntity(user);
    });
  },

  updateUser: async (data) => {
    return userRepository.update(data).then((user) => {
      return UserTransformer.toEntity(user);
    });
  },

  updateUserPoints: async (id, points) => {
    return userRepository.updatePoints(id, points).then((user) => {
      return UserTransformer.toEntity(user);
    });
  },

  deleteUser: async (id: string) => {
    return userRepository.delete(id);
  },

  isUserLogged: async (id: string) => {
    return await userRepository.getLoggedUser(id);
  },
};
