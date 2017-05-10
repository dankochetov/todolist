import React from 'react';

export default function TodoItem(props) {
    let className = 'todo well';
    if (props.completed) {
        className += ' completed';
    }
    if (props.overdue) {
        className += ' overdue';
    }
    return (
        <div
            className={className}
            onClick={props.toggleTodo}>
            <span
                title='Remove'
                className='pull-right glyphicon glyphicon-remove remove-button'
                onClick={(e) => {
                    e.stopPropagation();
                    props.removeTodo();
                }}/>
            <div
                className='todo-text'>
                {props.text}
                {props.completed && !props.overdue &&
                <span className='completed-icon glyphicon glyphicon-ok'/>
                }
                {props.overdue &&
                <span className='overdue-icon glyphicon glyphicon-remove'/>
                }
            </div>
            {props.timeLimited && !props.completed &&
            <div className='timelimit'>
                <span className='glyphicon glyphicon-time'/>
                &nbsp;
                {props.timeLimit}
            </div>
            }
        </div>
    );
}