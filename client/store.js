import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const env = process.env.NODE_ENV;

let middleware, store, composeEnhancers;

if (env === 'development') {
    middleware = applyMiddleware(thunk);

    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    store = createStore(reducers, composeEnhancers(middleware));
}
else {
    middleware = applyMiddleware(thunk);
    store = createStore(reducers, middleware);
}

export default store;