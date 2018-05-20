import database from "../firebase/firebase";
export const selectRepo = (repo) => {
  return {
    type: 'SELECT_REPO',
    selectedRepo: repo
  }
}

export const startSetSelectedRepo = (selected) => {
  return (dispatch, getState) => {
    const state = getState();
    const uid = state.auth.uid;
    return database.ref(`/users/${uid}/selectedRepo`).set(selected).then((ref) => {
      return dispatch(selectRepo(selected));
    });
  }
}

// export const startGetSelectedRepo = () => {
//   return (dispatch, getState) => {
//     const state = getState();
//     const uid = state.auth.uid;
//     return database.ref(`/users/${uid}/selectedRepo`).once('value').then((snapshot) => {
//       return dispatch(selectRepo(snapshot.val()));
//     });
//   }
// }