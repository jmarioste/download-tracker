import { toArray, each, random } from 'lodash';

const graphDataSelector = (data) => {
  const repoName = 'manga-viewer';
  const version = '1.2.2';
  const assets = data.repos[repoName][version].assets;
  const graphData = {
    labels: [],
    datasets: []
  };

  _.each(assets, (value, key) => {
    //generate pastel colors
    const red = random(0, 127) + 127;
    const blue = random(0, 127) + 127;
    const green = random(0, 127) + 127;

    graphData.datasets.push({
      label: key,
      backgroundColor: `rgba(${red},${blue},${green}, .05)`,
      borderColor: `rgba(${red},${blue},${green}, 1)`,
      pointRadius: 2,
      pointHitRadius: 5,
      data: _.map(value, (count, date) => count),
    })

    graphData.labels = _.map(value, (count, date) => date);
  });

  console.log(graphData);
  return graphData;
}

export default graphDataSelector;