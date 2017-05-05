'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm.jsx';
import TodoItem from './TodoItem.jsx';

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoText: ''
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-md-offset-3'>
                        <AddTodoForm
                            addTodo={this.props.addTodo}/>
                        <div id='todolist'>
                            {this.getTodos()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getTodos() {
        let todos = this.props.todos.map((todo, i) => {
            let text = todo.get('text');
            let completed = todo.get('completed');
            let timeLimited = todo.get('timeLimited');
            let timeLimit = todo.get('timeLimit');
            return (
                <TodoItem
                    key={i}
                    text={text}
                    timeLimited={timeLimited}
                    timeLimit={timeLimit}
                    completed={completed}
                    toggleTodo={() => this.props.toggleTodo(i)}
                    removeTodo={() => this.props.removeTodo(i)}/>
            );
        });

        return todos;
    }
}

TodoList.propTypes = {
    todos: PropTypes.any.isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
};