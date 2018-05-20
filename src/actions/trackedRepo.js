import database from "../firebase/firebase";

import { map } from "lodash";
export const addRepo = (repoName) => {
  return {
    type: 'ADD_REPO',
    repoName
  }
}

export const setRepos = (repos) => {
  return {
    type: 'SET_REPOS',
    repos
  }
}



export const startSetTrackedRepos = (trackedReposArray) => {
  return (dispatch, getState) => {
    const state = getState();
    const uid = state.auth.uid;
    const trackedRepos = {};

    trackedReposArray.forEach(repo => {
      trackedRepos[repo] = true;
    });
    console.log(trackedRepos);
    return database.ref(`/users/${uid}/trackedRepos`).set(trackedRepos).then((ref) => {
      return dispatch(setRepos(trackedReposArray));
    });
  }
}


// export const startGetTrackedRepos = () => {
//   console.loo
//   return (dispatch, getState) => {
//     const state = getState();
//     const uid = state.auth.uid;
//     return database.ref(`/users/${uid}/trackedRepos`).once('value').then((snapshot) => {
//       const trackedRepos = snapshot.val();
//       const trackedReposArray = _.map(trackedRepos, (repo, key) => key);
//       return dispatch(setRepos(trackedReposArray));
//     });
//   }
// }


