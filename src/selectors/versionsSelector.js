import { map } from "lodash";
const versionsSelector = (data, repoName) => {
  const releases = data[repoName];

  const versions = _.map(releases, (value, key) => key).sort((a, b) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  });
  return versions;
};

export default versionsSelector