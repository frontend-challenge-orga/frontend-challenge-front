import { Fragment } from "react";
import { AnalyticsNavigation } from "@/infrastructure/framework/modules/admin/layouts/navigation/analytics-navigation";

export default async function AdminPage() {
  return (
    <Fragment>
      <AnalyticsNavigation />
    </Fragment>
  );
}
