import React from 'react';
import { connect } from "react-redux";
import { startSetSelectedRepo } from '../actions/selectRepo';
import { MenuItem, Dropdown } from 'react-bootstrap';
import { startGetReleaseData } from '../actions/graphData';

export class DataPageHeader extends React.Component {
  onSelect = (repo) => {
    this.props.startSetSelectedRepo(repo)
      .then(() => this.props.startGetReleaseData());
  }

  render() {
    const { user, selectedRepo, showModal } = this.props;
    const repoName = `${user.username}/${selectedRepo}`;
    return (
      <div className="content-container">
        <Dropdown className="dropdown--link dropdown--repo" id="repo-dropdown" onSelect={this.onSelect}>
          <Dropdown.Toggle>
            <h1 className="page-header__title">
              {
                this.props.selectedRepo ? repoName : 'Select a repo...'
              }
            </h1>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              this.props.trackedRepos.map((repo) => {
                return (<MenuItem eventKey={repo} key={repo}>{repo}</MenuItem>)
              })
            }
          </Dropdown.Menu>
        </Dropdown>

        <span className="page-header__subtitle">
          Summary
      </span>
        <button
          className="button button--circle button__add-repo"
          onClick={showModal}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    startSetSelectedRepo: (repo) => {
      console.log(repo);
      return dispatch(startSetSelectedRepo(repo));
    },
    startGetReleaseData: (repo) => {
      return dispatch(startGetReleaseData(repo));
    }
  }
}
const mapStateToProps = (state) => {
  const isSelectedInTracked = state.trackedRepos.indexOf(state.selectedRepo) > -1;
  return {
    selectedRepo: isSelectedInTracked ? state.selectedRepo : undefined
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataPageHeader);