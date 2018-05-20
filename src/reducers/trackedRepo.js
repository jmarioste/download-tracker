const trackedRepoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REPO':
      return [
        ...state,
        action.repoName
      ];
    case 'SET_REPOS':
      return [
        ...action.repos
      ]
    default:
      return state;
  }
}

export default trackedRepoReducer