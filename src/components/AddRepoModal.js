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

  onCheckRepo = (e) => {
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
                Add a repo to add download count tracking.
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            {
              allRepos.map((repo, index) => {
                return <div key={index + repo}>
                  <input type="checkbox"
                    checked={this.state.trackedRepos.indexOf(repo) > -1}
                    onChange={this.onCheckRepo} value={repo}
                  />
                  {repo}
                </div>
              })
            }
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={this.onSave}>Save</Button>{' '}
            <Button color="primary" onClick={toggle}>Close</Button>{' '}
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