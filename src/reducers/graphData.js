const graphDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GRAPH_DATA':
      return {
        ...action.graphData
      };
    default:
      return state;
  }
};

export default graphDataReducer;