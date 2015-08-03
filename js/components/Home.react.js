import React, { Component } from 'react';
import AuthenticatedComponent from './AuthenticatedComponent.react'
import LoginStore from '../stores/LoginStore';

export default class Home extends AuthenticatedComponent {
    render() {
        if (!this.state.userLoggedIn) {
            return (
                <div className="login jumbotron center-block">
                    <h1>Welcome </h1>
                </div>
            );
        } else {
            return (
                <div className="login jumbotron center-block">
                    <h1>Hello {LoginStore.user}</h1>
                </div>
            );
        }
    }
};