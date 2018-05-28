import { toArray } from "lodash";
import moment from "moment";


const startDate = (graphData, selectedRepo) => {
    
  const repo = graphData[selectedRepo];
  const repoVersions = Object.keys(repo);
  const selectedVersion = repoVersions[0]
  const assets = toArray(repo[selectedVersion].assets);
  const asset = assets[0];
  const dates = Object.keys(asset);

  return moment(dates[0]);
}

export default startDate;
