import moment from 'moment';

const defaultFilterState = {
  version: '',
  startDate: moment().startOf('month'),
  endDate: moment(),
  period: 'month'
}

const filtersReducer = (state = defaultFilterState, action) => {
  switch (action.type) {
    case 'SET_VERSION':
      return {
        ...state,
        version: action.version
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
}

export default filtersReducer;