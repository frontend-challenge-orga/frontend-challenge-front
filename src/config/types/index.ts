export type SubscriptionDurationType = "MONTHLY" | "YEARLY";

export type FileType = "STARTER" | "FIGMA";

export type ChallengePageSearchParamsType = {
  searchParams: Record<string, string | undefined>;
};

export type ChallengeFilterTypeUpdate = Record<string, string[] | undefined>;
