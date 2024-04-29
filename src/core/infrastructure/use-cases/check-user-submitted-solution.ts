import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";
import type { Session } from "next-auth";

export async function checkUserSubmittedSolution(
  session: Session,
  slug: string,
) {
  return await challengeSolutionService.hasUserSubmittedSolution(
    session.user.id,
    slug,
  );
}
