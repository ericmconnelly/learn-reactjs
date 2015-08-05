'use strict';

import React, { Component } from 'react/addons';
import ReactMixin from 'react-mixin';
import AuthService from '../services/AuthService';
import LoginActions from '../actions/LoginActions';


export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            password: ''
        };
    }

    login(e) {
        e.preventDefault();
        AuthService.login(this.state.user, this.state.password, this.loginSuccess, this.loginFailure);
    }


    loginSuccess(username, data) {
        LoginActions.loginUser(username, data);
    }

    loginFailure(error) {
        var err = JSON.parse(error.responseText);
        alert(err.message);
    }

    render() {
        return (
            <div className="login jumbotron center-block">
                <h1>Login</h1>

                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">员工号</label>
                        <input type="text" valueLink={this.linkState('user')} className="form-control" id="username"
                               placeholder="员工号"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">密码</label>
                        <input type="password" valueLink={this.linkState('password')} className="form-control"
                               id="password" ref="password" placeholder="密码"/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>登录</button>
                </form>
            </div>
        );
    }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
