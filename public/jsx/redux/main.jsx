import {combineReducers} from 'redux';

import {todosReducer} from './todos.jsx';

const mainReducer = combineReducers({
    todos: todosReducer
});

export {
    mainReducer
}