'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class AddTodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            timeLimited: false,
            timeLimit: ''
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
        this.handleTimeCheckboxToggle = this.handleTimeCheckboxToggle.bind(this);
        this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
        this.initDatepicker = this.initDatepicker.bind(this);
    }

    render() {
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
                            value={this.state.text}
                            onChange={this.handleTextChange}/>
                        <span className='input-group-btn'>
                            <button
                                className='btn btn-primary'
                                onClick={this.handleAddBtnClick}>
                                Add
                            </button>
                        </span>
                    </div>
                    <div className='checkbox'>
                        <label>
                            <input
                                type='checkbox'
                                checked={this.state.timeLimited}
                                onChange={this.handleTimeCheckboxToggle}/>
                            Time limit
                        </label>
                    </div>
                    {this.state.timeLimited &&
                    <div
                        className='input-group date'
                        ref={this.initDatepicker}>
                        <input
                            type='text'
                            className='form-control'
                            value={this.state.timeLimit}
                            onChange={({target: {value}}) => this.handleDatetimeChange(value)}/>
                        <div className='input-group-addon'>
                            <span className='glyphicon glyphicon-calendar'/>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }

    initDatepicker(node) {
        $(node)
            .datetimepicker({
                minDate: moment(),
                sideBySide: true,
                allowInputToggle: true,
                toolbarPlacement: 'top',
                showClose: true,
                showTodayButton: true,
                format: this.props.datetimeFormat
            })
            .on('dp.change', ({date}) => this.handleDatetimeChange(date));
    }

    handleDatetimeChange(date) {
        if (date) {
            this.setState({timeLimit: date.format(this.props.datetimeFormat)});
        }
        else {
            this.setState({timeLimit: ''});
        }
    }

    handleTextChange({target: {value}}) {
        this.setState({text: value});
    }

    handleAddBtnClick() {
        let {text, timeLimited, timeLimit} = this.state;
        timeLimit = timeLimit.trim();
        text = text.trim();
        if (!moment(timeLimit, this.props.datetimeFormat).isValid()) {
            timeLimited = false;
            timeLimit = '';
        }
        if (text !== '') {
            this.props.addTodo({
                text,
                timeLimited,
                timeLimit
            });
            this.setState({
                text: '',
                timeLimit: '',
                timeLimited: false
            });
        }
    }

    handleTimeCheckboxToggle({target: {checked}}) {
        this.setState({timeLimited: checked});
    }
}

AddTodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    datetimeFormat: PropTypes.string.isRequired
};