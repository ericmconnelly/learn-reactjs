import React, { Component } from 'react';
import AuthenticatedComponent from './AuthenticatedComponent.react.js'
import LoginStore from '../stores/LoginStore';
import RouterContainer from '../services/RouterContainer'

export default AuthenticatedComponent(class Home extends Component {
    gotLogin() {
        RouterContainer.get().transitionTo('/login');
    }

    render() {
        return (
            <div className="login jumbotron center-block">
                <h1>Hello {LoginStore.user}</h1>
            </div>
        );
    }
});