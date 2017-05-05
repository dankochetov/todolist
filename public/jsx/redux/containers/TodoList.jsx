'use strict';

import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {mainReducer} from '../main.jsx';
import {
    addTodoAction,
    removeTodoAction,
    updateTodoAction,
    setTodosAction
} from '../todos.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from '../../TodoList.jsx';

const store = createStore(mainReducer/*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/);

const mapStateToProps = state => ({
    todos: state.todos.get('list')
});

const mapDispatchToProps = dispatch => ({
    addTodo: text => dispatch(addTodoAction(text)),
    removeTodo: ind => dispatch(removeTodoAction(ind)),
    toggleTodo: (state, ind) => dispatch(toggleTodoAction(state, ind)),
    setTodos: todos => dispatch(setTodosAction(todos)),
    makeOverdue: (state, ind) => dispatch(makeOverdueAction(state, ind))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    toggleTodo: ind => dispatchProps.toggleTodo(stateProps.todos, ind),
    makeOverdue: ind => dispatchProps.makeOverdue(stateProps.todos, ind)
});

const toggleTodoAction = (state, ind) => {
    let todo = state.get(ind);
    todo = todo.update('completed', d => !d);
    return updateTodoAction(ind, todo);
};

const makeOverdueAction = (state, ind) => {
    let todo = state.get(ind);
    todo = todo.set('overdue', true);
    return updateTodoAction(ind, todo);
};

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TodoList);

ReactDOM.render((
    <Provider store={store}>
        <TodoListContainer/>
    </Provider>
    ), document.getElementById('app')
);
