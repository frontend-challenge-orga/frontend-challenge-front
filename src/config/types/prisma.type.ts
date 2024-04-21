import type { Prisma } from "@prisma/client";

export type Challenge = Prisma.ChallengeGetPayload<{
  include: {
    createdBy: true;
  };
}>;
