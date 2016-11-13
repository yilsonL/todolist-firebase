import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      right: 0,
      opacity: 0
    }
  }

  handleEditClick() {
    this.setState({editing: true});
  }

  handleSave(id, text) {
    if(this.props.text !== text) {
      this.props.dispatch(actions.startEditTodo(id, text));
    }
  }

  handleBlur(e) {
    var text = e.target.value.trim();
    if(text.length === 0) {
      this.props.dispatch(actions.startDeleteTodo(this.props.id));
    } else {
      this.handleSave(this.props.id, text);
    }
    this.setState({editing: false, right: 0, opacity: 0});
  }

  handleEnter(e) {
    var text = e.target.value.trim();
    if(e.which == 13) {
      if(text.length === 0) {
        this.props.dispatch(actions.startDeleteTodo(this.props.id));
      } else {
        this.handleSave(this.props.id, text);
      }
      this.setState({editing: false, right: 0, opacity: 0});
    }
  }

  handleMouseEnter() {
    this.setState({right: -5.6, opacity: 1})
  }

  handleMouseLeave() {
    if(!this.state.editing) {
      this.setState({right: 0, opacity: 0})
    }
  }

  render() {

    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;

    var todoClassName = !completed ? 'todo' : 'todo todo-completed';

    var renderTodo = () => {
      if(this.state.editing) {
        return(
          <input
            type="text"
            className="todo-input"
            autoFocus="true"
            defaultValue={text}
            onBlur={this.handleBlur.bind(this)}
            onKeyDown={this.handleEnter.bind(this)}
          />
        )
      } else {
        return text;
      }
    };

    var renderDate = () => {
      var message = 'Created at ';
      var timestamp = new Date(createdAt);

      if(completed) {
        message = 'Completed at ';
        timestamp = new Date(completedAt);
      }

      var d = timestamp.toString().slice(0, 21).split(' ');
      // ['Sat', 'Nov', '12', '2016', '09:05']
      var formatedDate = [d[2], d[1], d[3]].join(' ') + ' - ' + d[4] + ' - ' + d[0];

      return message + formatedDate;
    };

    var renderToggle = () => {
      if(!completed) {
        return(
          <svg className="svg-icon svg-icon-done" viewBox="0 0 20 20">
            <path fill="none" d="M7.197,16.963H7.195c-0.204,0-0.399-0.083-0.544-0.227l-6.039-6.082c-0.3-0.302-0.297-0.788,0.003-1.087C0.919,9.266,1.404,9.269,1.702,9.57l5.495,5.536L18.221,4.083c0.301-0.301,0.787-0.301,1.087,0c0.301,0.3,0.301,0.787,0,1.087L7.741,16.738C7.596,16.882,7.401,16.963,7.197,16.963z"></path>
          </svg>
        )
      } else {
        return(
          <svg className="svg-icon svg-icon-undo" viewBox="0 0 20 20">
            <path fill="none" d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"></path>
          </svg>
        )
      }
    };

    var divStyle = {
      right: `${this.state.right}rem`,
      opacity: `${this.state.opacity}`
    };

    return(
      <div className="todo-container" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
        <div className={todoClassName}>
          <div className="todo-left" onClick={() => dispatch(actions.startToggleTodo(id, !completed))}>
            {renderToggle()}
          </div>
          <div className="todo-right">
            <div className="todo-text">
              {renderTodo()}
            </div>
            <div className="todo-subtext">
              {renderDate()}
            </div>
          </div>
        </div>
        <div className="todo-controls" style={divStyle}>
          <svg className="svg-icon svg-icon-edit" onClick={this.handleEditClick.bind(this)} viewBox="0 0 20 20">
            <path fill="none" d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"></path>
          </svg>
          <svg className="svg-icon svg-icon-remove" onClick={() => dispatch(actions.startDeleteTodo(id))} viewBox="0 0 20 20">
            <path fill="none" d="M18.693,3.338h-1.35l0.323-1.834c0.046-0.262-0.027-0.536-0.198-0.739c-0.173-0.206-0.428-0.325-0.695-0.325H3.434c-0.262,0-0.513,0.114-0.685,0.312c-0.173,0.197-0.25,0.46-0.215,0.721L2.79,3.338H1.307c-0.502,0-0.908,0.406-0.908,0.908c0,0.502,0.406,0.908,0.908,0.908h1.683l1.721,13.613c0.057,0.454,0.444,0.795,0.901,0.795h8.722c0.458,0,0.845-0.34,0.902-0.795l1.72-13.613h1.737c0.502,0,0.908-0.406,0.908-0.908C19.601,3.744,19.195,3.338,18.693,3.338z M15.69,2.255L15.5,3.334H4.623L4.476,2.255H15.69z M13.535,17.745H6.413L4.826,5.193H15.12L13.535,17.745z"></path>
          </svg>
        </div>
      </div>
    )
  }
}

Todo.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  completed: PropTypes.bool,
  createdAt: PropTypes.number,
  completedAt: PropTypes.number,
  dispatch: PropTypes.func
};

export default connect()(Todo);
