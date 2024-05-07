export type SubscriptionDurationType = "MONTHLY" | "YEARLY";

export type FileType = "STARTER" | "FIGMA";

export type ChallengeFilterType = {
  type?: string[];
  difficulty?: string[];
  language?: string[];
};

export type ChallengePageSearchParamsType = {
  searchParams?: {
    type?: string;
    difficulty?: string;
    language?: string;
  };
};
