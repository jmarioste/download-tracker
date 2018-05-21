export const setVersion = (version = '') => {
  return {
    type: 'SET_VERSION',
    version
  }
}

export const setStartDate = (startDate) => {
  return {
    type: 'SET_START_DATE',
    startDate
  }
}

export const setEndDate = (endDate) => {
  return {
    type: 'SET_END_DATE',
    endDate
  }
}
