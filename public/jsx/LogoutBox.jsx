'use strict';
import React, {Component} from 'react';

export default class LogoutBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            name: ''
        }
    }

    componentDidMount() {
        $.get('/api/getname', (data) => {
            this.setState({
                ready: true,
                name: data.name
            });
        });
    }

    render() {
        if (!this.state.ready) {
            return null;
        }

        return (
            <div id='logoutBox'>
                Hello, {this.state.name}!&nbsp;
                <button
                    className='btn btn-default'
                    onClick={() => window.location = 'auth/logout'}>
                    Logout
                </button>
            </div>
        );
    }
}