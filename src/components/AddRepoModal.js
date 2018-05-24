import React, { Component } from 'react'
import { connect } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import { startSetTrackedRepos } from '../actions/trackedRepo';
export class AddRepoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackedRepos: props.trackedRepos
    }
  }

  addRepo = (value) => {
    this.setState(({ trackedRepos }) => {
      return {
        trackedRepos: [
          ...trackedRepos,
          value
        ]
      }
    });
  }

  removeRepo = (value) => {
    this.setState((prevState) => {
      return {
        trackedRepos: prevState.trackedRepos.filter((repo) => {
          return repo !== value;
        })
      }
    })
  }

  onCheckRepo = (e, suppliedValue) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      this.addRepo(value);
    } else {
      this.removeRepo(value);
    }
  }
  onSave = (e) => {
    const repos = this.state.trackedRepos;
    const allRepos = this.props.allRepos;
    this.props.startSetTrackedRepos(repos, allRepos).then(() => {
      this.props.toggle();
    });
  }
  render() {
    const { show, toggle, allRepos = [], saveRepos } = this.props;
    return (
      <div>
        <Modal show={show} onHide={toggle}>
          <Modal.Header >
            <div className="modal-header__header-content">
              <h1 className="modal-header__title">Add Repos</h1>
              <i className="fa fa-times fa-lg" onClick={toggle}></i>
            </div>
            <div >
              <span className="modal-header__subtitle">
                Check the repos you want to track.
              </span>
            </div>
          </Modal.Header>
          <Modal.Body className="modal-body__repo_selector">
            <ul className="list-group">
              {
                allRepos.map((repo, index) => {
                  return <li key={index + repo} className="list-group-item">
                    <div className="label-check">
                      <div className="checkbox">
                        <input type="checkbox" id={index + repo}
                          checked={this.state.trackedRepos.indexOf(repo) > -1}
                          onChange={this.onCheckRepo} value={repo}
                        />
                        <label htmlFor={index + repo}>{repo}</label>
                      </div>
                    </div>
                  </li>
                })
              }
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.onSave}>Save</Button>{' '}
            <Button onClick={toggle}>Close</Button>{' '}
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    startSetTrackedRepos: (trackedReposArray, allRepos) => {
      return dispatch(startSetTrackedRepos(trackedReposArray, allRepos));
    }

  }
}

const mapStateToProps = (state) => {
  return {
    allRepos: state.allRepos,
    trackedRepos: state.trackedRepos
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddRepoModal);