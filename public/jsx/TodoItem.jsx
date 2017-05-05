'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TodoItem extends Component {
    render() {
        let className = 'todo well';
        if (this.props.completed) {
            className += ' completed';
        }
        return (
            <div
                className={className}
                onClick={this.props.toggleTodo}>
                <span
                    title='Remove'
                    className='pull-right glyphicon glyphicon-remove remove-button'
                    onClick={(e) => {e.stopPropagation(); this.props.removeTodo();}}/>
                <div
                    className='todo-text'>
                    {this.props.text}
                    {this.props.completed &&
                    <span className='completed-icon glyphicon glyphicon-ok'/>
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
}

TodoItem.propTypes = {
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    timeLimited: PropTypes.bool.isRequired,
    timeLimit: PropTypes.string.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
};