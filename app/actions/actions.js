import firebase, {firebaseRef, githubProvider} from 'app/firebase/';

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var startAddTodos = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todosRef = firebaseRef.child(`users/${uid}/todos`);

    todosRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parsedTodos = [];

      Object.keys(todos).map((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      dispatch(addTodos(parsedTodos));
    });
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var createdAt = new Date().getTime();
    var todo = {
      text,
      completed: false,
      createdAt: createdAt,
      completedAt: null
    }
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

    todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  }
};

export var deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  }
};

export var startDeleteTodo = (id) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    todoRef.remove().then(() => {
      dispatch(deleteTodo(id));
    });
  }
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startEditTodo = (id, text) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    var updates = {text};

    todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  }
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var completedAt = new Date().getTime();
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? completedAt : null
    };

    todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  }
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
};

export var startLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(githubProvider);
  }
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
};

export var startLogout = () => {
  return (dispatch, getState) => {
    firebase.auth().signOut();
  }
};
