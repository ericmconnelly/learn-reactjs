'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';
import RouterContainer from '../services/RouterContainer'

export default {
    loginUser: (user, authedData) => {
        var savedUser = localStorage.getItem('user');

        if (savedUser !== user) {
            RouterContainer.get().transitionTo('/tags');
            localStorage.setItem('user', user);
            localStorage.setItem('access_token', authedData.access_token);
            localStorage.setItem('mac_key', authedData.mac_key);
        }

        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGIN_USER,
            user: user
        });
    },
    logoutUser: () => {
        RouterContainer.get().transitionTo('/login');
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('mac_key');
        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGOUT_USER
        });
    }
}
