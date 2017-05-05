'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoText: ''
        }
    }

    render() {
        let todos = this.props.todos.map((todo, i) => {
            let text = todo.get('text');
            let completed = todo.get('completed');
            let className = 'list-group-item';
            if (completed) {
                className += ' completed';
            }
            return (
                <li
                    className={className}
                    key={i}
                    onClick={() => this.props.toggleTodo(i)}>{text}</li>
            );
        });
        return (
            <div className='container' id='todolist'>
                <AddTodoForm
                    addTodo={this.props.addTodo}/>
                <ul className='listGroup'>
                    {todos}
                </ul>
            </div>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.any.isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

class AddTodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div className='input-group'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Add todo'
                    value={this.state.value}
                    onChange={({target: {value}}) => this.setState({value})}/>
                <span className='input-group-btn'>
                    <button
                        className='btn btn-default'
                        onClick={() => this.props.addTodo(this.state.value)}>
                        Add
                    </button>
                </span>
            </div>
        );
    }
}

AddTodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired
};