import { memo, VFC } from "react";

import { EatSummaryCard } from "../../molecules/layout/EatSummaryCard";
import { Dashboard } from "../../../types/api/dashboard";

type Props = {
  dashboard: Dashboard | null;
};

export const DashboardEatCard: VFC<Props> = memo((props) => {
  const { dashboard } = props;
  const todayEat = dashboard ? dashboard.today.eat : null;
  const yesterdayEat = dashboard ? dashboard.yesterday.eat : null;

  let todayKcal: number;
  let todayPrice: number;
  let yesterdayKcal: number;
  let yesterdayPrice: number;

  if (todayEat) {
    todayKcal = Number(todayEat.kcal);
    todayPrice = Number(todayEat.price);
  } else {
    todayKcal = 0;
    todayPrice = 0;
  }

  if (yesterdayEat) {
    yesterdayKcal = Number(yesterdayEat.kcal);
    yesterdayPrice = Number(yesterdayEat.price);
  } else {
    yesterdayKcal = 0;
    yesterdayPrice = 0;
  }

  return (
    <EatSummaryCard
      todayKcal={todayKcal}
      todayPrice={todayPrice}
      yesterdayKcal={yesterdayKcal}
      yesterdayPrice={yesterdayPrice}
    />
  );
});
