import { memo, VFC } from "react";

import { HealthCard } from "../../molecules/layout/HealthCard";
import { Dashboard } from "../../../types/api/dashboard";

type Props = {
  dashboard: Dashboard | null;
};

export const DashboardHealthCard: VFC<Props> = memo((props) => {
  const { dashboard } = props;
  const todayHealth = dashboard ? dashboard.today.health : null;
  const yesterdayHealth = dashboard ? dashboard.yesterday.health : null;

  return (
    <HealthCard
      todayHealth={todayHealth}
      yesterdayHealth={yesterdayHealth}
    />
  );
});
