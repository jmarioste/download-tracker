import React, { Component } from 'react';
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import graphDataSelector from '../selectors/graphData';

export class LineGraph extends Component {
  options = {
    legend: {
      position: 'right'
    }
  }
  optionsMobile = {
    legend: {
      position: 'bottom'
    },
    maintainAspectRatio: false
  }
  render() {
    return (
      <div>
        <div className="hidden-xs">
          <Line className="hidden-sm" data={this.props.graphData} options={this.options} />
        </div>
        <div className="visible-xs-*">
          <Line className="visible-sm" data={this.props.graphData} options={this.optionsMobile} height={500} />
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    graphData: graphDataSelector(state.graphData, state.selectedRepo, state.filters)
  }
}

const mapDispatchToProps = (params) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineGraph);