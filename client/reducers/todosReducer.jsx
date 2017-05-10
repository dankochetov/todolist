import Immutable from 'immutable';

import * as A from '../actions/consts';

let initialState = new Immutable.List();

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case A.ADD_TODO:
            return state.push(action.data);
        case A.REMOVE_TODO:
            return state.remove(action.data);
        case A.UPDATE_TODO:
            return state.set(action.data.ind, action.data.value);
        case A.SET_TODOS:
            return action.data;
        default:
            return state;
    }
};