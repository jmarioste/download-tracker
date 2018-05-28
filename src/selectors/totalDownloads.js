import { without } from "lodash";
const totalDownloads = ({ datasets = [] }) => {

  const total = datasets.map(({ data }) => {
    data = without(data, null);
    if (data.length) {
      return Math.max(...data)
    } else {
      return 0;
    }
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  return total;
}

export default totalDownloads;
