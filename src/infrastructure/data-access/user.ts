import { db } from "@/config/server/db";
import type { IUserRepository } from "@/domain/interfaces/repositories/user.repository";

export class UserRepository implements IUserRepository {}

const userRepository = new UserRepository();
export default userRepository;
