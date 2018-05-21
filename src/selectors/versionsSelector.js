import { map } from "lodash";
const versionsSelector = (data, repoName) => {
  const releases = data.repos[repoName];

  const versions = _.map(releases, (value, key) => key);
  return versions;
};

export default versionsSelector