const summarySelector = ({ datasets = [] }) => {

  let increaseCount = 0;
  datasets.forEach(({ data }) => {
    // const data = dataset.data;
    const min = Math.min(...data);
    const max = Math.max(...data);
    console.log('stuff', min, max, data);
    const increase = max - min;
    increaseCount += increase;
  });
  console.log("summarySelector", increaseCount);
  return increaseCount;
}

export default summarySelector;
