import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import App from '../components/App';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoText: ''
        };

        this.datetimeFormat = 'MM/DD/YYYY HH:mm:ss';
    }

    componentWillMount() {
        this.props.getTodos();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.todos !== nextProps.todos) {
            window.localStorage.todos = JSON.stringify(nextProps.todos.toJS());
        }
    }

    render() {
        return (
            <App
                datetimeFormat={this.datetimeFormat}
                {...this.props}/>
        );
    }
}

const mapStateToProps = state => {
    let todos = state.todos;
    return {
        todos: todos
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    toggleTodo: ind => dispatchProps.toggleTodo(stateProps.todos, ind),
    makeOverdue: ind => dispatchProps.makeOverdue(stateProps.todos, ind)
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AppContainer);
