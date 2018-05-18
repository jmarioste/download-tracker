import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import PublicHeader from "../components/PublicHeader";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (

    <Route {...rest} component={(props) => (
      !isAuthenticated ? (
        <div>
          <PublicHeader />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/dashboard" />
        )
    )} />
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);