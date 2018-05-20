import axios from 'axios';

export const setAllRepos = (allRepos) => {
  return {
    type: 'SET_ALL_REPOS',
    allRepos
  }
};

export const startSetAllRepos = () => {
  return (dispatch, getState) => {
    const { username, accessToken } = getState().auth;
    const url = `https://api.github.com/users/${username}/repos?token=${accessToken}`;
    return axios.get(url).then((response) => {
      var repos = response.data.map(({ name }) => name)
      dispatch(setAllRepos(repos));
    });
  }
}
