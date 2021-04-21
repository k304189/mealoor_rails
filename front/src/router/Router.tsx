import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Top } from "../components/pages/Top";
import { UserSignup } from "../components/pages/user/UserSignup";
import { UserSignin } from "../components/pages/user/UserSignin";
import { Dashboard } from "../components/pages/Dashboard";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path = "/">
        <Top />
      </Route>
      <Route exact path = "/signup">
        <UserSignup />
      </Route>
      <Route exact path = "/signin">
        <UserSignin />
      </Route>
      <Route path = "/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  )
});
