import React from 'react';
import {connect} from 'react-redux';

import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

import * as actions from 'actions';

class HeaderControls extends React.Component {

  state = {
    addTodo: true,
    todoSearch: false
  }

  render() {

    var {addTodo, todoSearch} = this.state;

    var renderInput = () => {
      if(addTodo) {
        return <AddTodo />
      } else if(todoSearch) {
        return <TodoSearch />
      }
    }

    return(
      <div className="container__header">
        <div className="button-group">
          <button onClick={() => this.setState({addTodo: true, todoSearch: false})}>New</button>
          <button onClick={() => this.setState({addTodo: false, todoSearch: true})}>Search</button>
          <button onClick={() => this.props.dispatch(actions.toggleShowCompleted())}>Show Completed</button>
        </div>
        {renderInput()}
      </div>
    )
  }
}

export default connect()(HeaderControls);
