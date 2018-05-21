import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import trackedRepoReducer from '../reducers/trackedRepo';
import allRepos from '../reducers/allRepos';
import selectedRepoReducer from '../reducers/selectRepo';
import graphData from '../reducers/graphData';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      trackedRepos: trackedRepoReducer,
      allRepos: allRepos,
      selectedRepo: selectedRepoReducer,
      graphData: graphData
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};


