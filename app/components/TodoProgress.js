import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class TodoProgress extends React.Component {
  render() {

    var {todos} = this.props;
    var completedTodos = todos.filter((todo) => todo.completed).length;
    var progressPercentage = 0;

    if(completedTodos !== 0 && todos.length !== 0) {
      progressPercentage = (completedTodos / todos.length) * 100;
    }

    var progressClassName;
    if(progressPercentage === 100) {
      progressClassName = 'progress progress-completed';
    } else if (progressPercentage >= 50) {
      progressClassName = 'progress progress-half';
    } else {
      progressClassName = 'progress';
    }

    return <div className={progressClassName} style={{width: `${progressPercentage}%`}}></div>;
  }
}

TodoProgress.propTypes = {
  todos: PropTypes.array
};

export default connect((state) => state)(TodoProgress);
