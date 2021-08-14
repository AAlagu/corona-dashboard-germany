import React from "react";
import CountryComponent from "../components/CountryComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function MainRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CountryComponent} />
      </Switch>
    </Router>
  );
}
