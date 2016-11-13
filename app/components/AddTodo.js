import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

class AddTodo extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    var todoText = this.refs.todoText.value.trim();

    if(todoText.length > 0) {
      this.refs.todoText.value = '';
      this.props.dispatch(actions.startAddTodo(todoText));
    } else {
      this.refs.todoText.focus();
    }
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className="main-input" autoFocus="true" type="text" ref="todoText" placeholder="What needs to be done?" />
        </form>
      </div>
    )
  }
}

export default connect()(AddTodo);
