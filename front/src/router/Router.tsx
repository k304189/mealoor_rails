import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Top } from "../components/pages/top/Top";
import { UserList } from "../components/pages/user/UserList";
import { UserDetail } from "../components/pages/user/UserDetail";
import { Graph } from "../components/pages/graph/Graph";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { Calendar } from "../components/pages/calendar/Calendar";
import { DailyData } from "../components/pages/dailydata/DailyData";
import { SeasonalFoodList } from "../components/pages/seasonalfood/SeasonalFoodList";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { StockList } from "../components/pages/stock/StockList";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="/graph">
          <Graph />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/dailydata/:date">
          <DailyData />
        </Route>
        <Route path="/seasonalfood">
          <SeasonalFoodList />
        </Route>
        <Route exact path="/stock">
          <StockList />
        </Route>
        <Route exact path="/users">
          <UserList />
        </Route>
        <Route path="/users/detail/:id">
          <UserDetail />
        </Route>
      </LoginUserProvider>
    </Switch>
  );
});
