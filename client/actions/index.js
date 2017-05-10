import Immutable from 'immutable';
import {fetchTodos} from '../utils/fetchData';
import * as A from './consts';

const addTodoAction = (text, timeLimited, timeLimit) => ({
    type: A.ADD_TODO,
    data: Immutable.fromJS({
        text,
        timeLimited,
        timeLimit,
        completed: false,
        overdue: false
    })
});

const removeTodoAction = ind => ({
    type: A.REMOVE_TODO,
    data: ind
});

const updateTodoAction = (ind, value) => ({
    type: A.UPDATE_TODO,
    data: {
        ind,
        value
    }
});

const setTodosAction = list => ({
    type: A.SET_TODOS,
    data: Immutable.fromJS(list)
});

export const getTodos = () => {
    return dispatch => {
        fetchTodos()
            .then(todos => {
                dispatch(setTodosAction(todos));
            });
    }
};

export const addTodo = (text, timeLimited = false, timeLimit) => {
    return addTodoAction(text, timeLimited, timeLimit);
};

export const removeTodo = ind => {
    return removeTodoAction(ind);
};

export const updateTodo = (ind, value) => {
    return updateTodoAction(ind, value);
};

export const setTodos = list => {
    return setTodosAction(list);
};

export const makeOverdue = (todos, ind) => {
    let todo = todos.get(ind);
    todo = todo.set('overdue', true);
    return updateTodoAction(ind, todo);
};

export const toggleTodo = (todos, ind) => {
    let todo = todos.get(ind);
    todo = todo.update('completed', d => !d);
    return updateTodoAction(ind, todo);
};