// import dummyData from './dummyData';
import database from '../firebase/firebase'
export const setGraphData = (data) => {
  return {
    type: 'SET_GRAPH_DATA',
    graphData: data
  }
}

export const startGetReleaseData = (repo) => {
  return (dispatch, getState) => {
    const state = getState();
    const uid = state.auth.uid;
    return database.ref(`/users/${uid}/repos`).once('value').then((data) => {
      dispatch(setGraphData(data.val()));
    });
  }
}