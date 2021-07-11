import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Top } from "../components/pages/top/Top";
import { UserList } from "../components/pages/user/UserList";
import { UserDetail } from "../components/pages/user/UserDetail";
import { Graph } from "../components/pages/graph/Graph";
import { DashboardPage } from "../components/pages/dashboard/DashboardPage";
import { Calendar } from "../components/pages/calendar/Calendar";
import { DailyData } from "../components/pages/dailydata/DailyData";
import { SeasonalFoodList } from "../components/pages/seasonalfood/SeasonalFoodList";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { StockList } from "../components/pages/stock/StockList";
import { Http404 } from "../components/pages/http404/Http404";
import { Withdraw } from "../components/pages/withdraw/Withdraw";

export const Router: VFC = memo(() => {
  return (
    <LoginUserProvider>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route exact path="/graph">
          <Graph />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route path="/dailydata/:date">
          <DailyData />
        </Route>
        <Route exact path="/seasonalfood">
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
        <Route exact path="/withdraw">
          <Withdraw />
        </Route>
        <Route path="*">
          <Http404 />
        </Route>
      </Switch>
    </LoginUserProvider>
  );
});
