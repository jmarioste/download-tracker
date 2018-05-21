import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux'; //provide the store to all of the components
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import { map } from "lodash";

import { login, logout } from './actions/auth';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import database, { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { EAFNOSUPPORT } from 'constants';
import { startSetAllRepos } from './actions/allRepos';
import { startGetSelectedRepo, selectRepo } from './actions/selectRepo';
import { startGetTrackedRepos, startSetTrackedRepos, setRepos } from './actions/trackedRepo';
import { startGetReleaseData } from './actions/graphData';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}
console.log('Initializing app');

ReactDOM.render(<LoadingPage />, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
  if (user) {


    database.ref(`users/${user.uid}`).once('value').then((snapshot) => {
      var userData = snapshot.val();
      console.log('userData', userData);
      userData.uid = user.uid;
      store.dispatch(login(userData));


      store.dispatch(startSetAllRepos())
        .then(() => {
          let trackedReposArray = _.map(userData.trackedRepos, (repo, key) => key);
          console.log(trackedReposArray)
          store.dispatch(setRepos(trackedReposArray));
          store.dispatch(selectRepo(userData.selectedRepo));
        }).then(() => {
          return store.dispatch(startGetReleaseData(userData.selectedRepo));
        })
        .then(() => {
          renderApp();
          if (history.location.pathname === '/') {
            history.push('/dashboard');
          }
        })


    });


  } else {
    renderApp();
    store.dispatch(logout());
    history.push('/');
  }
});