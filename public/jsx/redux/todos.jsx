'use strict';

import Immutable from 'immutable';

let initialState = Immutable.fromJS({
    list: []
});

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';

const todosReducer = function(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return state.update('list', d => d.push(action.data));
        case REMOVE_TODO:
            return state.update('list', d => d.remove(action.data));
        case UPDATE_TODO:
            return state.update('list', d => d.set(action.data.ind, action.data.value));
        default:
            return state;
    }
};

const addTodoAction = ({text, timeLimited = false, timeLimit}) => ({
    type: ADD_TODO,
    data: Immutable.fromJS({
        text,
        timeLimited,
        timeLimit,
        completed: false
    })
});

const removeTodoAction = (ind) => ({
    type: REMOVE_TODO,
    data: ind
});

const updateTodoAction = (ind, value) => ({
    type: UPDATE_TODO,
    data: {
        ind,
        value
    }
});

export {
    todosReducer,
    addTodoAction,
    removeTodoAction,
    updateTodoAction
}