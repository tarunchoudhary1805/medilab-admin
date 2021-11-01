import React from "react";
import { Route } from "react-router";
import CustomerFollowUp from "../Pages/customerFollowUp/CustomerFollowUp";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Login/Login";
import Post from "../Pages/Post/Post";
import Service from "../Pages/Service/Service";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Post} />
      <Route path="/login" component={Login} />
      <Route path="/service" component={Service} />
      <Route path="/customerFollowUp" component={CustomerFollowUp} />
    </div>
  );
};

export default Routes;
