import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from "../actions/auth";
import AuthProvider from "../actions/provider.enum";
import { Link } from 'react-router-dom';

export const PublicHeader = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link to="/" className="header__title">
          <h2 >Github Download Tracker</h2>
        </Link>
        <button className="button button--login" onClick={props.startLogin}>
          <i className="fab fa-lg fa-github">
          </i>
          <span className="hidden-xs">Sign in with Github</span>
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    startLogin: () => {
      return dispatch(startLogin(AuthProvider.GITHUB));
    }
  }
}

export default connect(null, mapDispatchToProps)(PublicHeader);