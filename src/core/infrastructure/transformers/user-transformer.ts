import type { SaveUserDTO, UserDTO } from "@/core/infrastructure/dto/user.dto";
import type { User } from "@/core/domain/entities/user.entity";

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
