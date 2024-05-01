import type { User } from "@/core/domain/entities/user.entity";
import type { SaveUserDTO, UserDTO } from "@/core/infrastructure/dto/user.dto";

export class UserTransformer {
  static toDomain(userDTO: SaveUserDTO): User {
    return {
      ...userDTO,
      id: "",
      emailVerified: null,
    };
  }

  static toEntity(user: User): UserDTO {
    return user;
  }
}
