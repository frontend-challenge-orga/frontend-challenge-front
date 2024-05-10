import { ChallengeListLayout } from "@/core/views/components/layouts/challenge-list-layout";
import type { PropsWithChildren } from "react";

export default function ChallengeLayout({ children }: PropsWithChildren) {
  return <ChallengeListLayout>{children}</ChallengeListLayout>;
}
