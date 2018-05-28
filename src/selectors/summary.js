import { without } from "lodash";
const summarySelector = ({ datasets = [] }) => {

  const min = datasets.map(({ data }) => {
    data = without(data, null);
    return data.length ? Math.min(...data) : 0;
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  const max = datasets.map(({ data }) => {
    data = without(data, null);
    return data.length ? Math.max(...data) : 0;
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  return max - min;
}

export default summarySelector;
