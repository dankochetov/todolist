'use strict';

import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {mainReducer} from '../main.jsx';
import {addTodoAction, removeTodoAction} from '../todos.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App.jsx';

const store = createStore(mainReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mapStateToProps = state => ({
    todos: state.todos.get('todos')
});

const mapDispatchToProps = dispatch => ({
    addTodo: todo => dispatch(addTodoAction(todo)),
    removeTodo: ind => dispatch(removeTodoAction(ind))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render((
    <Provider store={store}>
        <AppContainer/>
    </Provider>
    ), document.getElementById('app')
);
