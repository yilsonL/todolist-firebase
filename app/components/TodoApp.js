import React from 'react';
import {connect} from 'react-redux';

import HeaderControls from 'HeaderControls';
import TodoProgress from 'TodoProgress';
import TodoList from 'TodoList';

import * as actions from 'actions';

class TodoApp extends React.Component {

  onLogout(e) {
    e.preventDefault();
    this.props.dispatch(actions.startLogout());
  }

  render() {
    return(
      <div className="wrapper">
        <button className="logout" onClick={this.onLogout.bind(this)}>Logout</button>
        <div className="container">
          <HeaderControls />
          <TodoProgress />
          <div className="container__footer">
            <TodoList />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(TodoApp);
