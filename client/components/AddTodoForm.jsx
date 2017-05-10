import React from 'react';

export default function AddTodoForm(props) {
    return (
        <div className='panel panel-default'>
            <div className='panel-body'>
                <div className='input-group'>
                        <span className='input-group-addon'>
                            TODO:
                        </span>
                    <input
                        className='form-control'
                        type='text'
                        value={props.text}
                        onChange={props.handleTextChange}/>
                    <span className='input-group-btn'>
                            <button
                                className='btn btn-primary'
                                onClick={props.handleAddBtnClick}>
                                Add
                            </button>
                        </span>
                </div>
                <div className='checkbox'>
                    <label>
                        <input
                            type='checkbox'
                            checked={props.timeLimited}
                            onChange={props.handleTimeCheckboxToggle}/>
                        Time limit
                    </label>
                </div>
                {props.timeLimited &&
                <div
                    className='input-group date'
                    ref={props.initDatepicker}>
                    <input
                        type='text'
                        className='form-control'
                        value={props.timeLimit}
                        onChange={({target: {value}}) => props.handleDatetimeChange(value)}/>
                    <div className='input-group-addon'>
                        <span className='glyphicon glyphicon-calendar'/>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}