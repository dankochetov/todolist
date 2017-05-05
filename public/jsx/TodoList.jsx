'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm.jsx';
import TodoItem from './TodoItem.jsx';
import LogoutBox from './LogoutBox.jsx';

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoText: ''
        };

        this.datetimeFormat = 'MM/DD/YYYY HH:mm:ss';
    }

    componentDidMount() {
        $.get('/api/gettodos', data => {
            this.props.setTodos(data.todos);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.todos !== nextProps.todos) {
            $.post('/api/settodos', {
                todos: nextProps.todos.toJS()
            });
        }
    }

    render() {
        return (
            <div>
                <LogoutBox/>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-md-offset-3'>
                            <AddTodoForm
                                addTodo={this.props.addTodo}
                                datetimeFormat={this.datetimeFormat}/>
                            <div id='todolist'>
                                {this.getTodos()}
                            </div>
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
            let overdue = todo.get('overdue');
            return (
                <TodoItem
                    key={i}
                    text={text}
                    timeLimited={timeLimited}
                    timeLimit={timeLimit}
                    completed={completed}
                    overdue={overdue}
                    datetimeFormat={this.datetimeFormat}
                    toggleTodo={() => this.props.toggleTodo(i)}
                    removeTodo={() => this.props.removeTodo(i)}
                    makeOverdue={() => this.props.makeOverdue(i)}/>
            );
        });

        return todos;
    }
}

TodoList.propTypes = {
    todos: PropTypes.any.isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    setTodos: PropTypes.func.isRequired,
    makeOverdue: PropTypes.func.isRequired
};