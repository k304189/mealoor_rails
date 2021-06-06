import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Top } from "../components/pages/top/Top";
import { UserSignup } from "../components/pages/user/UserSignup";
import { UserSignin } from "../components/pages/user/UserSignin";
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
        <Route exact path="/signup">
          <UserSignup />
        </Route>
        <Route exact path="/signin">
          <UserSignin />
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
      </LoginUserProvider>
    </Switch>
  );
});
