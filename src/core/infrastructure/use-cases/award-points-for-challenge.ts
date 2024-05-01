import { userService } from "@/core/infrastructure/services/user.service";
import { pointTransactionService } from "@/core/infrastructure/services/point.transaction.service";

export async function awardPointsForChallenge(
  userId: string,
  userPoints: number,
  challengePoints: number,
  challengeSolutionId: string,
) {
  await userService.updateUserPoints(userId, userPoints + challengePoints);
  await pointTransactionService.createPointTransaction({
    id: crypto.randomUUID(),
    userId: userId,
    points: challengePoints,
    type: "challenge",
    referenceId: challengeSolutionId,
  });
}
