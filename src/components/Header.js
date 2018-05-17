import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from "../actions/auth";
import { Link } from 'react-router-dom';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link to="/dashboard" className="header__title">
          <h1 >Boilerplate</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => {
      return dispatch(startLogout());
    }
  }
}

export default connect(null, mapDispatchToProps)(Header);