import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';


import { startLogout } from "../actions/auth";


export class Header extends React.Component {

  onSelect = (value) => {
    switch (value) {
      case "logout":
        this.props.startLogout();
        break;
      default:
        break;
    }
  }
  render() {
    const { startLogout, user } = this.props;
    const options = [
      "Logout"
    ];

    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link to="/dashboard" className="header__title">
              <h2 >Github Download Tracker</h2>
            </Link>
            <div>
              <Dropdown className="dropdown--link" onSelect={this.onSelect} id="user-dropdown">
                <Dropdown.Toggle>
                  <img src={user.photoURL} className="dropdown__profile-pic" />
                  {user.displayName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="logout">Logout</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => {
      return dispatch(startLogout());
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);