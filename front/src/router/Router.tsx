import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Top } from "../components/pages/top/Top";
import { UserSignup } from "../components/pages/user/UserSignup";
import { UserSignin } from "../components/pages/user/UserSignin";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { SeasonalFoodList } from "../components/pages/seasonalfood/SeasonalFoodList";
import { LoginUserProvider } from "../providers/LoginUserProvider";

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
        <Route path="/seasonalfood">
          <SeasonalFoodList />
        </Route>
      </LoginUserProvider>
    </Switch>
  );
});
