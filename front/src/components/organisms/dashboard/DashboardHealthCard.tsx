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

  let todayWeight: number;
  let todayFatPercent: number;
  let todayFatWeight: number;

  let yesterdayWeight: number;
  let yesterdayFatPercent: number;
  let yesterdayFatWeight: number;

  if (todayHealth) {
    todayWeight = Number(todayHealth.weight);
    todayFatPercent = Number(todayHealth.fat_percent);
    todayFatWeight = Number(todayHealth.fat_weight);
  } else {
    todayWeight = 0;
    todayFatPercent = 0;
    todayFatWeight = 0;
  }

  if (yesterdayHealth) {
    yesterdayWeight = Number(yesterdayHealth.weight);
    yesterdayFatPercent = Number(yesterdayHealth.fat_percent);
    yesterdayFatWeight = Number(yesterdayHealth.fat_weight);
  } else {
    yesterdayWeight = 0;
    yesterdayFatPercent = 0;
    yesterdayFatWeight = 0;
  }

  return (
    <HealthCard
      todayWeight={todayWeight}
      todayFatPercent={todayFatPercent}
      todayFatWeight={todayFatWeight}
      yesterdayWeight={yesterdayWeight}
      yesterdayFatPercent={yesterdayFatPercent}
      yesterdayFatWeight={yesterdayFatWeight}
    />
  );
});
