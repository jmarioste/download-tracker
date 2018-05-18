import { connect } from 'react-redux';
import React, { Component } from 'react'
import { MenuItem, Dropdown } from 'react-bootstrap';
const NoDataPageHeader = (props) => {
  return (
    <div className="content-container">
      <h1 className="page-header__title">
        Dashboard
            </h1>
      <span className="page-header__subtitle">
        Click + button to add a repo
            </span>
      <button className="button button--circle button__add-repo">
        <i className="fa fa-plus"></i>
      </button>
    </div>
  )
}

const DataPageHeader = (props) => {
  return (
    <div className="content-container">
      <Dropdown className="dropdown--link dropdown--repo" id="repo-dropdown">
        <Dropdown.Toggle>
          <h1 className="page-header__title">
            {`${props.user.username}/${props.repo.name}`}
          </h1>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem eventKey="1">manga-viewer</MenuItem>
          <MenuItem eventKey="2">github-download-tracker</MenuItem>
          <MenuItem eventKey="3">swiss-manager</MenuItem>
        </Dropdown.Menu>
      </Dropdown>

      <span className="page-header__subtitle">
        Summary
            </span>
      <button className="button button--circle button__add-repo">
        <i className="fa fa-plus"></i>
      </button>
    </div>
  )
}

export class DashboardPage extends Component {
  render() {
    const { repo } = this.props;
    return (
      <div>
        <div className="page-header">
          {repo ?
            <DataPageHeader {...this.props} />
            :
            <NoDataPageHeader />
          }
        </div>
      </div>


    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    repo: {
      name: 'manga-viewer'
    },
    user: state.auth
  }
}

export default connect(mapStateToProps)(DashboardPage);