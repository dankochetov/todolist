import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import AppContainer from 'containers/AppContainer.jsx';

import 'script-loader!jquery';
import 'script-loader!moment';
import 'script-loader!bootstrap/dist/js/bootstrap.min.js';
import 'script-loader!../dist/bootstrap-datetimepicker.min.js';

import '../dist/bootstrap-datetimepicker.min.css';
import '../dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>
, document.getElementById('root'));