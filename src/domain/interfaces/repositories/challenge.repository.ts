import type { Challenge } from "@/domain/models/challenge.model";

export interface IChallengeRepository {
  getChallenges(): Promise<Challenge[] | undefined>;
  getChallengeById(id: number): Promise<Challenge | undefined>;
  getChallengesCount(): Promise<number | undefined>;
  createChallenge(data: Challenge): Promise<void>;
  updateChallenge(id: number, data: Challenge): Promise<void>;
}
