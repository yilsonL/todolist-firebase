import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import TodoAPI from 'TodoAPI';
import Todo from 'Todo';

class TodoList extends React.Component {
  render() {

    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {
      var filterTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

      if(filterTodos.length === 0) {
        return <p className="empty">Nothing To Do</p>;
      }

      return filterTodos.map((todo) => <Todo key={todo.id} {...todo} />);
    };

    return(
      <div>
        {renderTodos()}
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  showCompleted: PropTypes.bool,
  searchText: PropTypes.string,
  dispatch: PropTypes.func
};

export default connect((state) => state)(TodoList);
