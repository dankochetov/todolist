'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.createOverdueTimeout = this.createOverdueTimeout.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);

        this.createOverdueTimeout();
    }

    createOverdueTimeout() {
        if (this.props.timeLimited) {
            this.timeout = setTimeout(this.props.makeOverdue,
                moment(this.props.timeLimit, this.props.datetimeFormat) - moment());
        }
    }

    render() {
        let className = 'todo well';
        if (this.props.completed) {
            className += ' completed';
        }
        if (this.props.overdue) {
            className += ' overdue';
        }
        return (
            <div
                className={className}
                onClick={this.toggleTodo}>
                <span
                    title='Remove'
                    className='pull-right glyphicon glyphicon-remove remove-button'
                    onClick={(e) => {e.stopPropagation(); this.props.removeTodo();}}/>
                <div
                    className='todo-text'>
                    {this.props.text}
                    {this.props.completed && !this.props.overdue &&
                    <span className='completed-icon glyphicon glyphicon-ok'/>
                    }
                    {this.props.overdue &&
                    <span className='overdue-icon glyphicon glyphicon-remove'/>
                    }
                </div>
                {this.props.timeLimited && !this.props.completed &&
                <div className='timelimit'>
                    <span className='glyphicon glyphicon-time'/>
                    &nbsp;
                    {this.props.timeLimit}
                </div>
                }
            </div>
        );
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

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}

TodoItem.propTypes = {
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