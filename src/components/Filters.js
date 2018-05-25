import React, { Component } from 'react'
import { connect } from "react-redux";
import { MenuItem, Dropdown } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import versionsSelector from "../selectors/versionsSelector";
import { setVersion, setStartDate, setEndDate } from "../actions/filters";

class Filters extends Component {
  state = {
    focusedInput: null
  }


  onSelect = (value) => {
    this.props.setVersion(value);
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  onFocusChange = (focusedInput) => {
    this.setState(() => {
      return {
        focusedInput: focusedInput
      }
    });
  }

  componentWillMount() {
    const selectedVersion = this.props.filters.version || this.props.versions[0] || '';
    this.props.setVersion(selectedVersion);
  }


  render() {
    const { filters } = this.props;
    return (
      <div className="filters">
        <div className="tag-selector">
          <i className="fa fa-tag fa-lg"></i>
          <Dropdown className="dropdown--tag-selector" id="release-version-dropdown" onSelect={this.onSelect}>
            <Dropdown.Toggle>
              <span>{filters.version.replace(/\-/g, '.') || 'Select a version'} </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                this.props.versions.map((version) => {
                  return (<MenuItem eventKey={version} key={version}>{version.replace(/\-/g, '.')}</MenuItem>)
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <DateRangePicker
            startDate={filters.startDate}
            startDateId="start-date"
            endDate={filters.endDate}
            endDateId="end-date"
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDates={true}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    versions: versionsSelector(state.graphData, state.selectedRepo),
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setVersion: (version) => {
      dispatch(setVersion(version));
    },
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);