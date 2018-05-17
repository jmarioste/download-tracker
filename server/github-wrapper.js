const axios = require('axios');

const getReposForUser = ({ username, accessToken }) => {
  return axios.get(`https://api.github.com/users/${username}/repos`, {
    headers: {
      token: accessToken
    }
  }).then((response) => {
    var repos = response.data.map(({ name }) => name)
    console.log("response", JSON.stringify(repos, null, 4));

    return repos;
  });
}


module.exports = {
  getReposForUser
}