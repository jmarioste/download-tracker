import database from "../firebase/firebase";
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



export const startSetTrackedRepos = (trackedReposArray, allRepos) => {
  return (dispatch, getState) => {
    const state = getState();
    const uid = state.auth.uid;
    const trackedRepos = {};

    allRepos.forEach(repo => {
      const isTracked = trackedReposArray.indexOf(repo) > -1;
      if (isTracked) {
        trackedRepos[repo] = isTracked;
      }
    });
    console.log(trackedRepos);
    return database.ref(`/users/${uid}/trackedRepos`).set(trackedRepos).then((ref) => {
      return dispatch(setRepos(trackedReposArray));
    });
  }
}


export const startGetTrackedRepos = () => {
  console.loo
  return (dispatch, getState) => {
    const state = getState();
    const uid = state.auth.uid;
    return database.ref(`/users/${uid}/trackedRepos`).once('value').then((snapshot) => {
      const obj = snapshot.val();
      let trackedReposArray = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          trackedReposArray.push(key);
        }
      }
      console.log(obj, trackedReposArray)
      return dispatch(setRepos(trackedReposArray));
    });
  }
}


