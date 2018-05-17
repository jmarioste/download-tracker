import React, { Component } from 'react'
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import AuthProvider from "../actions/provider.enum";
export class LoginPage extends Component {

  loginWithGoogle = () => {
    this.props.startLogin(AuthProvider.GOOGLE);
  }

  loginWithGithub = () => {
    this.props.startLogin(AuthProvider.GITHUB);
  }

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Boilerplate</h1>
          <p>Tagline for app </p>
          <button
            className="button"
            onClick={this.loginWithGithub}
          >Login with Github</button>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startLogin: (authProvider) => {
      dispatch(startLogin(authProvider))
    }
  }
};
export default connect(null, mapDispatchToProps)(LoginPage);