import type { User } from "@/domain/models/user.model";

const isUserPremium = (user: User): boolean => {
  return user.premium;
};
