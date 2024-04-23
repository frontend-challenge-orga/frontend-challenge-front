import { ChallengesAnalytics } from "@/framework/admin/analytics/challenges-analytics";

export const AnalyticsNavigation = () => {
  return (
    <nav
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ChallengesAnalytics />
    </nav>
  );
};
