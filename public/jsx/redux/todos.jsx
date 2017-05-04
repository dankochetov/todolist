'use strict';

import Immutable from 'immutable';

let initialState = Immutable.fromJS({
    todos: []
});

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

const todosReducer = function(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return state.update('todos', d => d.push(action.data));
        case REMOVE_TODO:
            return state.update('todos', d => d.remove(action.data));
        default:
            return state;
    }
};

const addTodoAction = (todo) => ({
    type: ADD_TODO,
    data: todo
});

const removeTodoAction = (ind) => ({
    type: REMOVE_TODO,
    data: ind
});

export {
    todosReducer,
    addTodoAction,
    removeTodoAction
}