import React from 'react';
import TodoItemContainer from '../containers/TodoItemContainer';

export default function TodoList(props) {
    let todos = props.todos.map((todo, i) => {
        let text = todo.get('text');
        let completed = todo.get('completed');
        let timeLimited = todo.get('timeLimited');
        let timeLimit = todo.get('timeLimit');
        let overdue = todo.get('overdue');
        return (
            <TodoItemContainer
                key={i}
                text={text}
                timeLimited={timeLimited}
                timeLimit={timeLimit}
                completed={completed}
                overdue={overdue}
                datetimeFormat={props.datetimeFormat}
                toggleTodo={() => props.toggleTodo(i)}
                removeTodo={() => props.removeTodo(i)}
                makeOverdue={() => props.makeOverdue(i)}/>
        );
    });

    return todos;
}