'use strict';

import React, { Component } from 'react';
import ReactRouter, { RouteHandler , Link}  from 'react-router';
import LoginStore from '../stores/LoginStore';
import AuthService from '../services/AuthService';

export default class AuthenticatedComponent extends Component {
    constructor() {
        super();
        this.state = this._getLoginState();
    }

    _getLoginState() {
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        };
    }

    _onChange() {
        this.setState(this._getLoginState());
    }

    logout(e) {
        e.preventDefault();
        AuthService.logout();
    }

    componentDidMount() {
        LoginStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange.bind(this));
    }

    get headerItems() {
        if (this.state.userLoggedIn) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="home">主页</Link>
                    </li>
                    <li>
                        <Link to="tags">标签列表</Link>
                    </li>
                    <li>
                        <a href="" onClick={this.logout}>登出</a>
                    </li>
                </ul>);
        }
    }


    render() {
        return (
        <div className="container theme-showcas">
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">公共标签</a>
                </div>
                {this.headerItems}
            </nav>
            <RouteHandler/>
        </div>
        );
    }
}
