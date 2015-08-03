'use strict';

import LoginActions from '../actions/LoginActions';
import NDMD5Utils from '../utils/NDMD5Utils';

class AuthService {

    login(username, password) {
        console.log(NDMD5Utils.getMD5Value(password));
        NDMD5Utils
        LoginActions.loginUser(username);
    }

    logout() {
        LoginActions.logoutUser();
    }
}

export default new AuthService()
