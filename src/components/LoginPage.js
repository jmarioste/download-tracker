import React, { Component } from 'react'
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import AuthProvider from "../actions/provider.enum";
import { Row, Col } from "react-bootstrap";
export class LoginPage extends Component {

  loginWithGithub = () => {
    this.props.startLogin(AuthProvider.GITHUB);
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container content-container--centered">
            <h1 className="page-header__title">Github Download Tracker</h1>
            <h3 className="page-header__subtitle"> Track your github releases download count easily </h3>
            <button
              className="button button--login--green"
              onClick={this.loginWithGithub}>
              <i className="fab fa-lg fa-github">
              </i>
              Sign in with Github
          </button>
          </div>
        </div>

        <div className="content-container login-content">
          <Row>
            <Col xs={12} md={6}>
              <img src="/images/dashboard-image.png" className="login-screenshot" alt="" />
            </Col>
            <Col xs={12} md={6}>
              <h2>Easily track download count of a release versions per day</h2>

              <p>
                Github doesn't have a UI to track download counts for releases, so if you want to track your download counts per day,
                this app solves the problem easily by providing you with graphs and helpful information for your repositories.
              </p>
            </Col>
          </Row>
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