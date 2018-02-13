import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home";
import Single from "./single";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/single/:country/:city"
        render={props => <Single {...props} />}
      />
    </Switch>
  </BrowserRouter>
);
