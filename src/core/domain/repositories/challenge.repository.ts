import type { Challenge } from "@/core/domain/entities/challenge.entity";

export interface IChallengeRepository {
  index(): Promise<Challenge[]>;
  show(id: string): Promise<Challenge>;
  showBySlug(slug: string): Promise<Challenge>;
  count(): Promise<number | undefined>;
  create(data: Challenge): Promise<Challenge>;
  update(id: string, data: Challenge): Promise<Challenge | undefined>;
  remove(id: string): Promise<void>;
}
