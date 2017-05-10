import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddTodoForm from '../components/AddTodoForm';

export default class AddTodoFormContainer extends Component {
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
            this.props.addTodo(text, timeLimited, timeLimit);
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

    render() {
        return (
            <AddTodoForm
                {...this.state}
                {...this.props}
                initDatepicker={this.initDatepicker}
                handleDatetimeChange={this.handleDatetimeChange}
                handleTextChange={this.handleTextChange}
                handleAddBtnClick={this.handleAddBtnClick}
                handleTimeCheckboxToggle={this.handleTimeCheckboxToggle}/>
        );
    }
}

AddTodoFormContainer.propTypes = AddTodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    datetimeFormat: PropTypes.string.isRequired
};

AddTodoForm.propTypes = Object.assign({}, AddTodoForm.propTypes, {
    initDatepicker: PropTypes.func.isRequired,
    handleDatetimeChange: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    handleAddBtnClick: PropTypes.func.isRequired,
    handleTimeCheckboxToggle: PropTypes.func.isRequired
});