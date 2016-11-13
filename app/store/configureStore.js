import * as redux from 'redux';
import thunk from 'redux-thunk';

import {todosReducer, showCompletedReducer, searchTextReducer, authReducer} from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    todos: todosReducer,
    showCompleted: showCompletedReducer,
    searchText: searchTextReducer,
    auth: authReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
