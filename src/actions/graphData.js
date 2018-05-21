import dummyData from './dummyData';

export const setGraphData = (data) => {
  return {
    type: 'SET_GRAPH_DATA',
    graphData: data
  }
}

export const startGetReleaseData = (repo) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      resolve(dummyData);
    }).then((data) => {
      dispatch(setGraphData(data));
    })
  }
}