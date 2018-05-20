const selectRepoReducer = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_REPO':
      return action.selectedRepo;
    default:
      return state;
  }
}

export default selectRepoReducer;