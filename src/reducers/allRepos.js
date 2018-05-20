const allRepos = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_REPOS':
      return [
        ...action.allRepos
      ];

    default:
      return state;
  }
}

export default allRepos