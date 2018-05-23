import { connect } from 'react-redux';
import React, { Component } from 'react'
import DataPageHeader from './DataPageHeader';
import AddRepoModal from "./AddRepoModal";
import LineGraph from './LineGraph';
import Filters from './Filters';
import versionsSelector from '../selectors/versionsSelector';
import summarySelector from '../selectors/summary';
import graphDataSelector from '../selectors/graphData';


const NoDataPageHeader = (props) => {
  return (
    <div className="content-container">
      <h1 className="page-header__title">
        Dashboard
            </h1>
      <span className="page-header__subtitle">
        Click + button to add a repo
            </span>
      <button className="button button--circle button__add-repo" onClick={props.showModal}>
        <i className="fa fa-plus"></i>
      </button>


    </div>
  )
}



export class DashboardPage extends Component {
  state = {
    show: false
  }

  componentWillMount() {


  }

  toggle = (params) => {
    console.log("toggle")
    this.setState(({ show }) => {
      return {
        show: !show
      }
    })
  }

  render() {
    const hasTrackedRepos = this.props.trackedRepos.length > 0;
    return (

      <div>
        <div className="page-header">
          {hasTrackedRepos ?
            <DataPageHeader {...this.props} showModal={this.toggle} />
            :
            <NoDataPageHeader showModal={this.toggle} />
          }
        </div>
        {
          this.props.hasVersions && (
            <div className="content-container">
              <Filters />
              <LineGraph />
            </div>
          )
        }
        {
          !this.props.hasVersions && (
            <div className="content-container no-data-message">
              <h2>
                <i className="fa fa-info-circle fa-lg"></i>
                I have no data to crunch from this repo... ;( </h2>
            </div>
          )
        }
        <AddRepoModal show={this.state.show} toggle={this.toggle} />
      </div>


    )
  }
}


const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth,
    trackedRepos: state.trackedRepos,
    selectedRepo: state.selectedRepo,
    hasVersions: versionsSelector(state.graphData, state.selectedRepo).length > 0,

  }
}

export default connect(mapStateToProps)(DashboardPage);