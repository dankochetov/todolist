import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TodoItem from '../components/TodoItem';

export default class TodoItemContainer extends Component {
    constructor(props) {
        super(props);

        this.createOverdueTimeout = this.createOverdueTimeout.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);

        this.createOverdueTimeout();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    createOverdueTimeout() {
        if (this.props.timeLimited) {
            this.timeout = setTimeout(this.props.makeOverdue,
                moment(this.props.timeLimit, this.props.datetimeFormat) - moment());
        }
    }

    toggleTodo() {
        if (this.props.overdue) {
            return;
        }

        if (!this.props.completed) {
            clearTimeout(this.timeout);
        }
        else {
            this.createOverdueTimeout();
        }

        this.props.toggleTodo();
    }

    render() {
        return (
            <TodoItem
                {...this.props}
                toggleTodo={this.toggleTodo}/>
        );
    }
}

TodoItemContainer.propTypes = TodoItem.propTypes = {
    completed: PropTypes.bool.isRequired,
    overdue: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    timeLimited: PropTypes.bool.isRequired,
    timeLimit: PropTypes.string.isRequired,
    datetimeFormat: PropTypes.string.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    makeOverdue: PropTypes.func.isRequired
};

TodoItemContainer.defaultProps = {
    overdue: false
};