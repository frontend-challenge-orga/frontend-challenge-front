import { IUserRepository } from "@/domain/repositories/user.repository";

export class UserRepository implements IUserRepository {}

const userRepository = new UserRepository();
export default userRepository;
