import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Top } from "../components/pages/Top";
import { Dashboard } from "../components/pages/Dashboard";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path = "/">
        <Top />
      </Route>
      <Route path = "/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  )
});
