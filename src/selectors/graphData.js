import { toArray, each, random } from 'lodash';
import moment from "moment";

const createLabelsFromDates = (startDate, endDate) => {
  var start = moment(startDate);
  var end = moment(endDate);
  var array = []
  // While the updated start date is older, perform the loop.
  while (start.isBefore(end)) {
    // Update the format according to moment js documentations format().
    array.push(start.format("MM-DD-YYYY"));
    start = start.add('days', 1);
  }
  return array;
};

const graphDataSelector = (data, repoName, filters) => {
  if (!filters.version) {
    return {};
  }
  const { startDate, endDate } = filters;
  const assets = data[repoName][filters.version].assets;
  const graphData = {
    labels: createLabelsFromDates(startDate, endDate),
    datasets: []
  };
  console.log
  _.each(assets, (value, artifactName) => {
    //generate pastel colors
    const red = random(0, 127) + 127;
    const blue = random(0, 127) + 127;
    const green = random(0, 127) + 127;

    const dataSet = {
      label: artifactName.replace(/u002E/g, '.'),
      backgroundColor: `rgba(${red},${blue},${green}, .2)`,
      borderColor: `rgba(${red},${blue},${green}, 1)`,
      pointRadius: 2,
      pointHitRadius: 5,
      // data: _.map(value, (count, date) => count),
      data: []
    }
    graphData.datasets.push(dataSet)

    graphData.labels.forEach((date) => {
      var count = value[date] || null;
      dataSet.data.push(count);
    })
  });

  console.log(graphData);
  return graphData;
}

export default graphDataSelector;