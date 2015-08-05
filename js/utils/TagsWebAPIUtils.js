'use strict';

import $ from 'jquery';
import AuthUtils from './AuthUtils';

export default {
    load: function (page, size, success) {
        var url = 'http://' + config.host + '/v0.1/tag/pageable/common/0?page=' + page + '&size=' + size;
        var method = 'GET';
        var auth = AuthUtils.getAuthHeader(url, method);
        $.ajax({
            url: url,
            type: method,
            headers: { "Authorization": auth},
            dataType: 'json',
            cache: true,
            success: function (data) {
                success(data);
            },
            error: function (err) {
                console.error(err.responseText, status, err.toString());
            }
        });
    },

    update: function (data, success) {
        var url = 'http://' + config.host + '/v0.1/tag/batch/common';
        var method = 'PUT';
        var auth = AuthUtils.getAuthHeader(url, method);
        var postData =JSON.stringify(data);
        $.ajax({
            url: url,
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json; charset=UTF-8"
            },
            dataType: 'json',
            type:'PUT',
            data: postData,
            success: function (data) {
                success(data);
            },
            error: function (err) {
                console.error(err.responseText, status, err.toString());
            }
        });
    }
};