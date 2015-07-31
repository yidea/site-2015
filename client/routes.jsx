/**
 * routes
 */
import React from "react";
import {Route, DefaultRoute, NotFoundRoute} from "react-router";
import Configs from "config/configs";

import Container from "./components/container";
import Home from "./components/home";

export default (
  <Route name="app" path="/" handler={Container}>
    <DefaultRoute name="home" handler={Home} />
    <NotFoundRoute handler={Home} />
  </Route>
);
