'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';
import RouterContainer from '../services/RouterContainer'

export default {
    loginUser: (user) => {
        var savedUser = localStorage.getItem('user');

        if (savedUser !== user) {
            RouterContainer.get().transitionTo('/tags');
            localStorage.setItem('user', user);
        }

        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGIN_USER,
            user: user
        });
    },
    logoutUser: () => {
        RouterContainer.get().transitionTo('/login');
        localStorage.removeItem('user');
        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGOUT_USER
        });
    }
}
