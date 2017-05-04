'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoText: ''
        }
    }

    render() {
        return (
            <div>
                <input
                    type='text'
                    placeholder='Add todo'
                    value={this.state.todoText}
                    onChange={({target: {value}}) => this.setState({todoText: value})}/>
                <button onClick={() => this.props.addTodo(this.state.todoText)}>
                    Add
                </button>
                <ul>
                    {this.props.todos.map((todo, i) => (
                        <li
                            key={i}
                            onClick={() => this.props.removeTodo(i)}>{todo}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    todos: PropTypes.any.isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
};