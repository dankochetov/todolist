import React from 'react';
import PropTypes from 'prop-types';
import AddTodoFormContainer from '../containers/AddTodoFormContainer';
import TodoList from './TodoList';

export default function App(props) {
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-md-offset-3'>
                        <AddTodoFormContainer
                            addTodo={props.addTodo}
                            datetimeFormat={props.datetimeFormat}/>
                        <div id='todolist'>
                            {TodoList(props)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

App.propTypes = {
    datetimeFormat: PropTypes.string.isRequired,
    todos: PropTypes.any.isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    setTodos: PropTypes.func.isRequired,
    makeOverdue: PropTypes.func.isRequired
};