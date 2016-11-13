import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';

import * as actions from 'actions';
import firebase from 'app/firebase/';

var store = require('configureStore').configure();

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    browserHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    browserHistory.push('/');
  }
});

require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Login} />
        <Route path="todos" component={TodoApp} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
);
