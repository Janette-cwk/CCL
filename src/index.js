import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import PrivateRoute from "./PrivateRoute";


import AdminLayout from "layouts/AdminLayout.jsx";
import UserLayout from "layouts/UserLayout.jsx";
import HomeLayout from "layouts/HomeLayout.jsx";

import awsmobile from './aws-exports'
import Amplify from "aws-amplify";
Amplify.configure(awsmobile);
ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route exact path="/">
        <Redirect to="/user/usercourse" />
      </Route>
      <Route exact path="/admin">
        <Redirect to="/admin/courses" />
      </Route>
      <Route exact path="/user">
        <Redirect to="/user/usercourse" />
      </Route>
      <Route path="/home" render={props => <HomeLayout {...props} />} />
      <PrivateRoute path='/admin' component={AdminLayout} />
      <Route path="/user" render={props => <UserLayout {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
