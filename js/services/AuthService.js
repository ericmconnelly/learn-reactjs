'use strict';

import LoginActions from '../actions/LoginActions';
import NDMD5Utils from '../utils/NDMD5Utils';
import $ from 'jquery';


class AuthService {

    login(username, password, success, failure) {
        var postData = JSON.stringify({login_name: username, password: NDMD5Utils.getMD5Value(password)});
        $.ajax({
            url: config.uc_uri + 'tokens',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            dataType: 'json',
            type: 'post',
            data: postData,
            success: function (data) {
                success(username, data);
            },
            error: function (err) {
                failure(err);
            }
        });

    }

    logout() {
        LoginActions.logoutUser();
    }
}

export default new AuthService()
